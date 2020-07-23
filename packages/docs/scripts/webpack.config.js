const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanUpStatsPlugin = require('./CleanUpStatsPlugin')

const isProd = process.env.NODE_ENV === 'production'

const isDev = !isProd

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    isDev
      ? require.resolve('style-loader')
      : {
          loader: MiniCssExtractPlugin.loader,
          options: {}
        },
    {
      loader: require.resolve('css-loader'),
      options: { sourceMap: true, ...cssOptions }
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        sourceMap: true
      }
    }
  ].filter(Boolean)
  if (preProcessor) {
    const options = {
      sourceMap: true
    }
    loaders.push({
      loader: require.resolve(preProcessor),
      options
    })
  }
  return loaders
}

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  context: path.resolve(__dirname, '..'),
  output: {
    path: isDev ? '/' : path.resolve(__dirname, '../dist'),
    filename: isDev ? 'static/js/[name].js' : 'static/js/[name].[contenthash:8].js',
    chunkFilename: isDev
      ? 'static/js/[name].chunk.js'
      : 'static/js/[name].[contenthash:8].chunk.js',
    publicPath: '/'
  },
  mode: isDev ? 'development' : 'production',
  bail: isProd,
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.mdx'],
    alias: {
      react: require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
      '@xl-vision/commons': path.resolve(__dirname, '../../commons/src'),
      '@xl-vision/styles': path.resolve(__dirname, '../../styles/src'),
      '@xl-vision/icons': path.resolve(__dirname, '../../icons/src'),
      '@xl-vision/core': path.resolve(__dirname, '../../core/src'),
      '@': path.resolve(__dirname, 'src')
    },
    modules: [
      path.join(__dirname, '..', 'node_modules'),
      path.join(__dirname, '../../commons', 'node_modules'),
      path.join(__dirname, '../../styles', 'node_modules'),
      path.join(__dirname, '../../icons', 'node_modules'),
      path.join(__dirname, '../../core', 'node_modules')
    ]
  },
  optimization: {
    minimize: isProd,
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true
          }
        }
      }),
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            warnings: false,
            comparisons: false,
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        },
        parallel: true,
        cache: true,
        sourceMap: true
      })
    ],
    splitChunks: {
      chunks: 'all',
      name: true
    },
    runtimeChunk: true
  },
  module: {
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },
      {
        test: /\.(ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        sideEffects: true,
        options: {
          configFile: path.join(__dirname, 'babel.config.js')
        }
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        sideEffects: true,
        options: {
          configFile: path.join(__dirname, 'babel.config.js')
        }
      },
      {
        test: /\.(md|mdx)$/,
        exclude: /node_modules/,
        sideEffects: true,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: path.join(__dirname, 'babel.config.js')
            }
          },
          {
            loader: require.resolve('./mdxLoader')
          }
        ]
      },
      {
        test: /\.css$/,
        use: getStyleLoaders({
          esModule: true,
          importLoaders: 1
        })
      },
      {
        test: /\.(sass|scss)$/,
        use: getStyleLoaders(
          {
            esModule: true,
            importLoaders: 2
          },
          'sass-loader'
        )
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production')
    }),
    isProd &&
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
    new ForkTsCheckerWebpackPlugin({
      async: isDev,
      typescript: {
        configFile: path.join(__dirname, '../tsconfig.json'),
        mode: 'write-references',
        diagnosticOptions: {
          syntactic: true
        }
      }
    }),
    new CleanUpStatsPlugin(),
    new CaseSensitivePathsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../public').replace(/\\/g, '/'),
          to: path.join(isDev ? '/' : path.join(__dirname, '../dist'), 'public').replace(/\\/g, '/')
        }
      ]
    }),
    isDev && new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, '../index.html'),
      // 传递环境变量给页面
      PUBLIC_PATH: '/',
      ...(isDev
        ? {}
        : {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true
            }
          })
    }),
    !isDev &&
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
      })
  ].filter(Boolean),
  devServer: {
    compress: true,
    clientLogLevel: 'warning',
    contentBase: false,
    hot: true,
    publicPath: '/',
    historyApiFallback: true,
    port: 3000,
    open: true,
    watchOptions: {
      ignored: [/node_modules/]
    },
    overlay: {
      error: true
    }
  }
}

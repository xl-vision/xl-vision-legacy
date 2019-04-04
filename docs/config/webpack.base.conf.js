const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const isProd = () => process.env.NODE_ENV === 'production'

module.exports = {
    context: path.resolve(__dirname, '../'),
    devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
    entry: './src/app.tsx',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: isProd ? '[name].[hash].js' : '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
            'react': path.resolve(__dirname, '../node_modules', 'react'),
            'react-dom': path.resolve(__dirname, '../node_modules', '@hot-loader/react-dom'),
            'react-hot-loader': path.resolve(__dirname, '../node_modules', 'react-hot-loader'),
            'xl-vision': path.resolve(__dirname, '../../src/package'),
            '@': path.resolve(__dirname, '..', 'src'),
        }
    },
    stats: {
        warningsFilter: /export .* was not found in/
    },
    module: {
        rules: [{
            //     test: /\.tsx?$/,
            //     include: /src/,
            //     enforce: 'pre',
            //     use: [{
            //         loader: 'thread-loader'
            //     }, {
            //         loader: 'tslint-loader',
            //         options: {
            //             // configFile: tslintPath,
            //             // tsConfigFile: tsconfigPath,
            //             typeCheck: true
            //         }
            //     }]
            // }, {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'thread-loader'
            }, {
                loader: 'babel-loader',
                // options: getBabelConfig(false),
            }, {
                loader: 'ts-loader',
                options: {
                    happyPackMode: true,
                    transpileOnly: true,
                },
            }],
        }, {
            test: /\.md$/,
            exclude: /node_modules/,
            use: [{
                loader: 'thread-loader'
            }, {
                loader: 'babel-loader',
                // options: getBabelConfig(false),
            }, {
                loader: require.resolve('./md-loader')
            }]
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10,
                name: 'img/[name].[hash:7].[ext]'
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: 'fonts/[name].[hash:7].[ext]'
            }
        }]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true,
            measureCompilationTime: true,
            async: !isProd(),
            tslint: true
        }),
        new HtmlWebpackPlugin({
            inject: true,
            title: 'xl-vision',
            template: path.resolve(__dirname, '..', 'index.html')
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../public'),
            to: isProd() ? path.resolve(__dirname, '../dist') + '/static' : 'static',
            ignore: ['.*']
        }])
    ]
}
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const babelConfig = require('../lib/getBabelConfig')('commonjs')

babelConfig.plugins.push('@babel/plugin-syntax-dynamic-import')

const webpackConfig = {
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    entry: path.join(process.cwd(), 'site/index.tsx'),
    output: {
        path: path.join(process.cwd(), 'docs-dist'),
        filename: `js/[name].[hash].js`,
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: /node_modules/,
            enforce: 'pre',
            loader: 'tslint-loader',
            options: {
                typeCheck: true,
                tsConfigFile: 'tsconfig.site.json',
            },
        }, {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: babelConfig,
                },
                {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        configFile: 'tsconfig.site.json',

                    },
                },
            ],
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: babelConfig,
                },
            ],
        }, {
            test: /\.md$/,
            loader: 'raw-loader',
        }],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `css/[name].[hash].css`,
        }),
    ],
}


module.exports = webpackConfig



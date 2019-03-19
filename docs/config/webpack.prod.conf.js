const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const baseConfig = require('./webpack.base.conf')

module.exports = webpackMerge(baseConfig, {
    mode: 'production',
    // devtool: 'source-map',
    output: {
        publicPath: '/xl-vision/'
    },
    optimization: {
        sideEffects: false, //不加会导致xl-vision的css加载不进来
        // splitChunks: {
        //     cacheGroups: {
        //         commons: {
        //             name: 'commons', //提取出来的文件命名
        //             chunks: 'initial', //initial表示提取入口文件的公共部分
        //             minChunks: 2, //表示提取公共部分最少的文件数
        //             minSize: 0 //表示提取公共部分最小的大小
        //         }
        //     }
        // },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                // sourcMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader
            }, {
                loader: 'css-loader',
            }, {
                loader: 'postcss-loader',
                options: {
                    config: {
                        path: path.resolve(__dirname, '../')
                    }
                }
            }]
        }, {
            test: /\.scss$/,
            use: [{
                loader: MiniCssExtractPlugin.loader
            }, {
                loader: 'css-loader',
            }, {
                loader: 'postcss-loader',
                options: {
                    config: {
                        path: path.resolve(__dirname, '../')
                    }
                }
            }, {
                loader: 'sass-loader'
            }]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '..')
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
            chunkFilename: "css/[id].[hash].css"
        }),
    ]
})
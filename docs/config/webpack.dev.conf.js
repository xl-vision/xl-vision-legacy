const webpackMerge = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base.conf')

module.exports = webpackMerge(baseConfig, {
    mode: 'development',
    output: {
        publicPath: '/'
    },
    devServer: {
        contentBase: false,
        historyApiFallback: true,
        clientLogLevel: 'error',
        hot: true
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
            }, {
                loader: 'postcss-loader',
                options:{
                    config:{
                        path: path.resolve(__dirname, '../')
                    }
                }
            }]
        }, {
            test: /\.scss$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
            }, {
                loader: 'postcss-loader',
                options:{
                    config:{
                        path: path.resolve(__dirname, '../')
                    }
                }
            }, {
                loader: 'sass-loader'
            }]
        }]
    }
})
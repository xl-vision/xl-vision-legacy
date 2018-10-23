const webpackMerge = require('webpack-merge')
const webpack = require('webpack')
const chalk = require('chalk')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const fs = require('fs')


const webpackConfig = {
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    // entry: {},
    output: {
        path: path.join(process.cwd(), 'dist'),
        // publicPath: config.src.publicPath,
        library: 'xl-vision',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        // filename: `[name]${isProd ? '.min' : ''}.js`,
    },
    externals: {
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React',
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
            root: 'ReactDom',
        },
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
            }),
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
                // tsConfigFile: path.join(process.cwd(),'tsconfig.json')
            },
        }, {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                },
                {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    },
                },
            ],
        }],
    },
    plugins: [],
}


module.exports = (entries) => {

    const isProd = process.env.NODE_ENV === 'production'

    webpackConfig.mode = isProd ? 'production' : 'development'

    const mergeConfig = webpackMerge(webpackConfig, {
        entry: entries,
        output: {
            filename: `[name]${isProd ? '.min' : ''}.js`,
        },
    })


    return mergeConfig


}

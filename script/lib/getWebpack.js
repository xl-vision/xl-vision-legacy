const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackMerge = require('webpack-merge')
const webpack = require('webpack')
const chalk = require('chalk')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const path = require('path')
const fs = require('fs')
const config = require('../config')
const getComponents = require('../utils/getComponents')


const webpackConfig = {
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    // entry: {},
    output: {
        path: path.join(process.cwd(), config.source.dist),
        // publicPath: config.src.publicPath,
        library: config.source.libName,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        // filename: `[name]${isProd ? '.min' : ''}.js`,
    },
    externals: {
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "react",
            root: "React"
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
            root: 'ReactDom'
        }
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
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
            }
        }, {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader'
                },
                {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    }
                }
            ]
        }]
    },
    plugins: []
}


module.exports = (done) => {

    const isProd = process.env.NODE_ENV === 'production'
    webpackConfig.mode = isProd ? 'production' : 'development'

    const indexFile = path.join(process.cwd(), config.source.lib, 'index.ts')

    if (!fs.existsSync(indexFile)) {
        console.warn(chalk.yellow(`No '${indexFile}'`))
        return
    }

    const indexWebpackConfig = webpackMerge(webpackConfig, {
        entry: indexFile,
        output: {
            filename: `index.js`
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: `style/index.css`
            })
        ]
    })


    const entry = {}
    const map = getComponents(config.source.lib)
    Object.keys(map).forEach(it => {
        entry[lowerHead(it)] = path.join(process.cwd(), map[it])
    })
    const componentWebpackConfig = webpackMerge(webpackConfig, {
        entry,
        output: {
            filename: `lib/[name]/index.js`
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: `lib/[name]/style/index.css`
            })
        ]
    })


    webpack([componentWebpackConfig, indexWebpackConfig], (err, stats) => {
        if (err) {
            console.error(chalk.red(err.stack || err))
            if (err.details) {
                console.log(chalk.red(err.details))
            }
            done(err)
            return
        }
        const info = stats.toJson();

        if (stats.hasErrors()) {
            console.error(chalk.red(info.errors));
        }

        if (stats.hasWarnings()) {
            console.warn(chalk.yellow(info.warnings));
        }

        const buildInfo = stats.toString({
            colors: true,
            children: true,
            chunks: false,
            modules: false,
            chunkModules: false,
            hash: false,
            version: false
        })

        console.log(buildInfo)
        done()
    })
}


function lowerHead(str) {
    return str.replace(/^./, function (match) {
        return match.toLowerCase()
    })
}
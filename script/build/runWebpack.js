const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const webpackMerge = require('webpack-merge')
const webpack = require('webpack-stream')
const compiler = require('webpack')

const getBabelConfig = require('../config/getBabelConfig')

const tslintPath = 'tslint.json'
const tsconfigPath = 'tsconfig.json'

const webpackBaseConfig = {
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    entry: path.join(process.cwd(), 'src/index.tsx'),
    output: {
        // path: path.join(process.cwd(), 'dist'),
        // publicPath: config.src.publicPath,
        library: 'xl-vision',
        libraryTarget: 'umd',
        umdNamedDefine: true,
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
    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: /node_modules/,
            enforce: 'pre',
            loader: 'tslint-loader',
            options: {
                configFile: tslintPath,
                tsConfigFile: tsconfigPath,
                // typeCheck: true,
            },
        }, {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: getBabelConfig(false),
                },
                {
                    loader: 'ts-loader',
                    options: {
                        configFile: tsconfigPath,
                        transpileOnly: true,
                    },
                },
            ],
        }]
    }
}


const webpackDevConfig = webpackMerge(webpackBaseConfig, {
    mode: 'development',
    output: {
        filename: `xl-vision.js`,
    }
})

const webpackProdConfig = webpackMerge(webpackBaseConfig, {
    mode: 'production',
    output: {
        filename: `xl-vision.min.js`,
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
            }),
        ]
    }
})

function runWebpack(stream, isCompressed = false) {
    const config = isCompressed ? webpackProdConfig : webpackDevConfig
    return stream.pipe(webpack(config, compiler, (err, stats) => {
        if (err) {
            console.error(err.stack || err)
            if (err.details) {
                console.error(err.details)
            }
            return
        }

        const info = stats.toJson()

        if (stats.hasErrors()) {
            console.error(info.errors)
        }

        if (stats.hasWarnings()) {
            console.warn(info.warnings)
        }

        const buildInfo = stats.toString({
            colors: true,
            children: true,
            chunks: false,
            modules: false,
            chunkModules: false,
            hash: false,
            version: false,
        })
        console.log(buildInfo)
    }))
}

module.exports = runWebpack
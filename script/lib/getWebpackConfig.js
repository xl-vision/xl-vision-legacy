const webpackMerge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

const webpackConfig = {
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    entry: path.join(process.cwd(), 'src/index.tsx'),
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
        }],
    },

}


module.exports = () => {
    const isProd = process.env.NODE_ENV === 'production'
    const babelConfig = require('./getBabelConfig')(false)

    const mergeConfig = webpackMerge(webpackConfig, {
        mode: isProd ? 'production' : 'development',
        output: {
            filename: `xl-vision${isProd ? '.min' : ''}.js`,
        },
        module: {
            rules: [{
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
                        },
                    },
                ],
            }]
        }
    })

    return mergeConfig
}



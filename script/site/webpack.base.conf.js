const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const babelConfig = require('../lib/getBabelConfig')(false)

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
    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: /node_modules/,
            enforce: 'pre',
            loader: 'tslint-loader',
            options: {
                // typeCheck: true,
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
                    },
                },
            ],
        }],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `css/[name].[hash].css`
        })
    ]
}


module.exports = webpackConfig



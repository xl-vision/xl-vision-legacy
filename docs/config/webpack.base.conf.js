const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProd = () => process.env.NODE_ENV === 'production'

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
            '@': path.resolve(__dirname, '..', 'src')
        }
    },
    entry: path.resolve(__dirname, '..', 'src/app.tsx'),
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: '[name].[hash].js'
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: /node_modules/,
            enforce: 'pre',
            loader: 'tslint-loader',
            options: {
                // configFile: tslintPath,
                // tsConfigFile: tsconfigPath,
                typeCheck: true
            },
        }, {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [{
                    loader: 'babel-loader',
                    // options: getBabelConfig(false),
                },
                {
                    loader: 'ts-loader',
                    options: {
                        // configFile: tsconfigPath,
                        transpileOnly: true,
                    },
                }
            ],
        }, {
            test: /\.md$/,
            exclude: /node_modules/,
            use: [{
                    loader: 'babel-loader',
                    // options: getBabelConfig(false),
                },
                {
                    loader: require.resolve('./md-loader')
                }
            ]
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
        new HtmlWebpackPlugin({
            title: 'xl-vision',
            template: path.resolve(__dirname, '..', 'index.html')
        })
    ]
}
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MarkdownItContainer = require('markdown-it-container')
const md = require('markdown-it')()

const isProd = () => process.env.NODE_ENV === 'production'

const containerRender = (tokens, idx) => {
    var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
    if (tokens[idx].nesting === 1) {
        let title = m && m.length > 1 ? m[1] : ''
        title = md.render(title).replace("'", "\'")
        let content = tokens[idx + 2].content
        content = md.render(content).replace("'", "\'")
        let code = tokens[idx + 4].content.replace(/^\s*export +default/, 'const Demo = ')
        code = `${code}\n`
        return `<div class='aaaa'>`

    }
    return '</div>\n'
}

module.exports = {
    devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
            '@': path.resolve(__dirname, '..', 'src'),
            react: require.resolve("react")
        }
    },
    entry: path.resolve(__dirname, '..', 'src/app.tsx'),
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: isProd ? '[name].[hash].js' : '[name].js'
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
                loader: 'thread-loader'
            }, {
                loader: 'babel-loader',
                // options: getBabelConfig(false),
            }, {
                loader: 'ts-loader',
                options: {
                    happyPackMode: true,
                    // configFile: tsconfigPath,
                    transpileOnly: true,
                },
            }],
        }, {
            test: /\.md$/,
            exclude: /node_modules/,
            use: [{
                //     loader: 'thread-loader'
                // }, {
                loader: 'babel-loader',
                // options: getBabelConfig(false),
            }, {
                loader: '@xl-vision/react-md-loader',
                options: {
                    plugins: [[MarkdownItContainer, 'demo', {
                        validate: function (params) {
                            return params.trim().match(/^demo\s*(.*)$/)
                        },
                        render: containerRender
                    }]]
                }
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
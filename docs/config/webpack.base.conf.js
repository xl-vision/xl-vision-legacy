const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    entry: path.resolve(__dirname, '..', 'src/app.tsx'),
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: '[name].[chunkhash].js'
    },
    externals: {},
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
            use: [
                {
                    loader: 'babel-loader',
                    // options: getBabelConfig(false),
                },
                {
                    loader: 'ts-loader',
                    options: {
                        // configFile: tsconfigPath,
                        transpileOnly: true,
                    },
                },
            ],
        }, {
            test: /\.md$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    // options: getBabelConfig(false),
                },
                {
                    loader: require.resolve('./md-loader'),
                    options: {
                    }
                }
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', 'index.html')
        })
    ]
}
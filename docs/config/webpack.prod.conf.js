const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')

module.exports = webpackMerge(baseConfig, {
    mode: 'production'
})
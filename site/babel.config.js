module.exports = function (api) {
    const isProd = api.env('production')
    const ret = {
        presets: [
            ["@babel/preset-env", {
                // modules: modules || false
            }], "@babel/preset-react"
        ],
        plugins: [
            "@babel/plugin-transform-runtime",
            "@babel/plugin-syntax-dynamic-import",
            "react-hot-loader/babel"
        ]
    }
    if (isProd) {
        ret.plugins.push([
            'transform-react-remove-prop-types',
            {
                mode: 'remove',
                removeImport: true
            },
        ])
    }
    return ret
}
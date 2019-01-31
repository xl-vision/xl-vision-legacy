const getBabelConfig = modules => {
    return {
        presets: [
            ["@babel/preset-env", {
                modules: modules || false
            }], "@babel/preset-react"
        ],
        plugins: [
            "@babel/plugin-transform-runtime",
        ]
    }
}

module.exports = getBabelConfig
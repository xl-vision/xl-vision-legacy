module.exports = function (modules) {
    return {
        presets: [
            ["@babel/preset-env", {
                modules
            }], "@babel/preset-react"
        ],
        plugins: [
            "@babel/plugin-transform-runtime"
        ]
    }
}
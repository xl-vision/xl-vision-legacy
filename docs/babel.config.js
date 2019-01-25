module.exports = {
    presets: [
        ["@babel/preset-env", {
            // modules: modules || false
        }], "@babel/preset-react"
    ],
    plugins: [
        "@babel/plugin-transform-runtime"
    ]
}
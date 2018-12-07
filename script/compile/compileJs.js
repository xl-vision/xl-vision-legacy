const babel = require('gulp-babel')

const getBabelConfig = modules => {
  return {
    presets: [
        ["@babel/preset-env", {
            modules: modules || false
        }], "@babel/preset-react"
    ],
    plugins: [
        "@babel/plugin-transform-runtime"
    ]
}
}

function compileJs(stream, modules = false) {
  return stream.pipe(babel(getBabelConfig(modules)))
}

export default compileJs
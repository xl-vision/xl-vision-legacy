const babel = require('gulp-babel')
const getBabelConfig = require('../config/getBabelConfig')

function compileJs(stream, modules = false) {
    return stream.pipe(babel(getBabelConfig(modules)))
}

module.exports = compileJs
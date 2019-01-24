const sass = require('gulp-sass')
const compileCss = require('./compileCss')

function compileScss(stream) {
  const cssStream = stream.pipe(sass())
    .on('error', function (error) {
      console.error(error.toString())
      this.emit('end')
    })
  return compileCss(cssStream)
}

module.exports = compileScss
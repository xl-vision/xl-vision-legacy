const postcss = require('gulp-postcss')

function compileCss(stream) {
  return stream.pipe(postcss())
}

module.exports = compileCss
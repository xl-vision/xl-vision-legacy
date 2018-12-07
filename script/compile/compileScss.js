const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
// const cleanCSS = require('gulp-clean-css')

function compileScss(stream) {
  return stream.pipe(sass())
    .on('error', function (error) {
      console.error(error.toString())
      this.emit('end')
    })
    .pipe(postcss())
}

export default compileScss
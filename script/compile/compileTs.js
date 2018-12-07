const gulp = require('gulp')
const ts = require('gulp-typescript')
const babel = require('gulp-babel')
const merge2 = require('merge2')
const getBabelConfig = require('./getBabelConfig')

const tsDefaultReporter = ts.reporter.defaultReporter()


function compileTs(src, tsConfig = 'tsconfig.json', isCompressed = false) {
  const tsProject = ts.createProject(tsConfig)
  let error = false
  const tsResult = gulp.src(src).pipe(tsProject({
    error(err, ts) {
      tsDefaultReporter.error(err, ts)
      error = true
    },
    finish: tsDefaultReporter.finish,
  }))

  function check() {
    if (error) {
      this.emit('end')
    }
  }

  tsResult.on('finish', check)
  tsResult.on('end', check)

  const tsd = tsResult.dts
  const js = tsResult.js.pipe(babel(getBabelConfig(modules))).pipe(gulp.dest(dest))
  return merge2([tsd, js])
}

export default compileTs

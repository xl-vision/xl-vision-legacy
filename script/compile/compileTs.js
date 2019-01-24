const ts = require('gulp-typescript')
const merge2 = require('merge2')
const compileJs = require('./compileJs')

const tsDefaultReporter = ts.reporter.defaultReporter()

function compileTs(stream, modules = false, tsConfig = 'tsconfig.json') {
  const tsProject = ts.createProject(tsConfig)
  let error = false
  const tsResult = stream.pipe(tsProject({
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
  const js = compileJs(tsResult.js, modules)
  return merge2([tsd, js])
}

module.exports = compileTs

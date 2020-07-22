const gulp = require('gulp')
const path = require('path')
const babel = require('gulp-babel')
const typescript = require('gulp-typescript')

const defaultReporter = typescript.reporter.defaultReporter()

module.exports = ({ es }) => {
  const from = ['src/**/*.ts?(x)', '!**/__test__/**', '!**/__doc__/**']
  const to = es ? 'es' : 'lib'

  const tsConfigPath = path.resolve(process.cwd(), 'tsconfig.json')

  const tsProject = typescript.createProject(tsConfigPath, {
    declaration: true,
    target: 'ESNext'
  })

  return new Promise((resolve, reject) => {
    const errors = []

    const tsResult = gulp.src(from).pipe(
      tsProject({
        error(err, ts) {
          defaultReporter.error(err, ts)
          errors.push(err)
        },
        finish() {
          if (errors.length > 0) {
            return reject(errors)
          }
          return resolve()
        }
      })
    )

    tsResult.dts.pipe(gulp.dest(to))

    tsResult.js
      .pipe(
        babel({
          babelrc: false,
          configFile: path.resolve(__dirname, './config/babel.config.js'),
          envName: es ? 'es' : 'lib'
        })
      )
      .pipe(gulp.dest(to))
  })
}

const gulp = require('gulp')
const path = require('path')
const babel = require('gulp-babel')
const typescript = require('gulp-typescript')
const changed = require('gulp-changed')
const merge2 = require('merge2')

const build = (packageName, es) => {
  const basePath = path.resolve(__dirname, 'packages', packageName)
  const from = [path.resolve(basePath, 'src/**/*.ts?(x)'), '!**/__test__/**', '!**/__doc__/**']
  const to = path.resolve(basePath, es ? 'es' : 'lib')

  const tsConfigPath = path.resolve(basePath, 'tsconfig.json')

  const tsProject = typescript.createProject(tsConfigPath, {
    declaration: true,
    target: 'ESNext'
  })

  const tsResult = gulp
    .src(from)
    .pipe(
      changed(to, {
        basePath,
        extension: '.js'
      })
    )
    .pipe(tsProject())

  const s1 = tsResult.dts

  const s2 = tsResult.js.pipe(
    babel({
      babelrc: false,
      configFile: path.resolve(__dirname, 'babel.config.js'),
      envName: es ? 'es' : 'lib'
    })
  )

  return merge2(s1, s2).pipe(gulp.dest(to))
}

gulp.task('compileEs:commons', () => build('commons', true))
gulp.task('compileLib:commons', () => build('commons', false))

gulp.task('compileEs:styles', () => build('styles', true))
gulp.task('compileLib:styles', () => build('styles', false))

gulp.task('compileEs:icons', () => build('icons', true))
gulp.task('compileLib:icons', () => build('icons', false))

gulp.task('compileEs:core', () => build('core', true))
gulp.task('compileLib:core', () => build('core', false))

gulp.task(
  'compileLib',
  gulp.series('compileLib:commons', 'compileLib:styles', 'compileLib:icons', 'compileLib:core')
)

gulp.task(
  'compileEs',
  gulp.series('compileEs:commons', 'compileEs:styles', 'compileEs:icons', 'compileEs:core')
)

gulp.task('compile', gulp.parallel('compileLib', 'compileEs'))

gulp.task('watch', () => {
  gulp.watch(
    ['packages/*/src/**/*.ts?(x)', '!packages/docs/**', '!**/__test__/**', '!**/__doc__/**'],
    gulp.task('compile')
  )
})

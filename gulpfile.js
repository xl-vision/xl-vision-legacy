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

const mergeBuild = (packageName) => {
  return gulp.parallel(
    () => build(packageName, true),
    () => build(packageName, false)
  )
}

gulp.task('compile:commons', mergeBuild('commons'))
gulp.task('compile:styles', mergeBuild('styles'))
gulp.task('compile:icons', mergeBuild('icons'))
gulp.task('compile:core', mergeBuild('core'))

gulp.task(
  'compile',
  gulp.series('compile:commons', 'compile:styles', 'compile:icons', 'compile:core')
)

gulp.task('watch', () => {
  gulp.watch(
    ['packages/*/src/**/*.ts?(x)', '!packages/docs/**', '!**/__test__/**', '!**/__doc__/**'],
    gulp.task('compile')
  )
})

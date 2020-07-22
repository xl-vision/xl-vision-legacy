const gulp = require('gulp')
const path = require('path')
const babel = require('gulp-babel')
const typescript = require('gulp-typescript')
const changed = require('gulp-changed')
const merge2 = require('merge2')
const stp = require('stream-to-promise')

const build = ({ es, cwd }) => {
  const from = [path.resolve(cwd, 'src/**/*.ts?(x)'), '!**/__test__/**', '!**/__doc__/**']
  const to = path.resolve(cwd, es ? 'es' : 'lib')

  const tsConfigPath = path.resolve(cwd, 'tsconfig.json')

  const tsProject = typescript.createProject(tsConfigPath, {
    declaration: true,
    target: 'ESNext'
  })

  const tsResult = gulp
    .src(from)
    .pipe(
      changed(to, {
        cwd,
        extension: '.js'
      })
    )
    .pipe(tsProject())

  const s1 = tsResult.dts

  const s2 = tsResult.js.pipe(
    babel({
      babelrc: false,
      configFile: path.resolve(__dirname, './config/babel.config.js'),
      envName: es ? 'es' : 'lib'
    })
  )

  return stp(merge2(s1, s2).pipe(gulp.dest(to)))
}

const buildByDeps = ({ cwd = process.cwd() }) => {
  const allDeps = require(path.join(cwd, 'package.json')).dependencies || {}

  const deps = Object.keys(allDeps).filter((it) => it.startsWith('@xl-vision/'))

  const promises = deps
    .map((it) => path.resolve(cwd, '..', it.split('/')[1]))
    .map((it) => buildByDeps({ cwd: it }))

  return Promise.all(promises)
    .then(() => build({ es: false, cwd }))
    .then(() => build({ es: true, cwd }))
}

module.exports = buildByDeps

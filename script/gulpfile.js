const gulp = require('gulp')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const cleanCSS = require('gulp-clean-css')
const through2 = require('through2')
const path = require('path')
const webpack = require('webpack')
const getWebpackConfig = require('./lib/getWebpackConfig')
const glob = require('glob')
const chalk = require('chalk')
const typescript = require('gulp-typescript')
const babel = require('gulp-babel')

gulp.task('build-css', () => {
    const isProd = process.env.NODE_ENV === 'production'

    return gulp.src(['src/components/**/style/index.scss'])
        .pipe(sass())
        .on('error', error => {
            console.error(error.toString())
            this.emit('end')
        })
        .pipe(postcss())
        .pipe(cleanCSS({
            level: 2,
            format: isProd ? 'none' : 'beautify',
        }))
        .pipe(through2.obj(function (file, encoding, next) {
            file.path = file.path.replace(/.css$/, match => {
                return `${isProd ? '.min' : ''}.css`
            })
            this.push(file)
            next()
        }))
        .pipe(gulp.dest('dist'))
})


gulp.task('build-js', (done) => {

    process.env.NODE_ENV = 'production'
    const files = glob('src/components/**/index.tsx', { sync: true })

    const entries = {}

    for (const file of files) {
        const key = file.replace(/^src\/components\//, '').replace(/.tsx$/, '')
        entries[key] = path.join(process.cwd(), file)
    }

    webpack(getWebpackConfig(entries), (err, stats) => {
        if (err) {
            console.error(chalk.red(err.stack || err))
            if (err.details) {
                console.log(chalk.red(err.details))
            }
            done(err)
            return
        }
        const info = stats.toJson()

        if (stats.hasErrors()) {
            console.error(chalk.red(info.errors))
        }

        if (stats.hasWarnings()) {
            console.warn(chalk.yellow(info.warnings))
        }

        const buildInfo = stats.toString({
            colors: true,
            children: true,
            chunks: false,
            modules: false,
            chunkModules: false,
            hash: false,
            version: false,
        })

        console.log(buildInfo)
        done()
    })
})

gulp.task('build-ts', done => {
    const tsProject = typescript.createProject('tsconfig.json')
    const tsResult = gulp.src(['src/**/*.tsx', 'src/**/*.ts', 'src/**/*.d.ts'])
        .pipe(tsProject())
})
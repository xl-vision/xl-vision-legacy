const gulp = require('gulp')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const cleanCSS = require('gulp-clean-css')
const path = require('path')
const through2 = require('through2')
const ts = require('gulp-typescript')
const tsDefaultReporter = ts.reporter.defaultReporter()
const babel = require('gulp-babel')
const tslint = require('gulp-tslint')
const merge2 = require('merge2')
const getBabelConfig = require('./lib/getBabelConfig')
const fs = require('fs-extra')
const getWebpackConfig = require('./lib/getWebpackConfig')
const webpack = require('webpack')

const sources = {
    ts: [
        'src/**/*.ts',
        'src/**/*.tsx',
        'src/**/*.d.ts',
    ],
    js: [
        'src/**/*.js',
        'src/**/*.jsx',
    ],
    scss: [
        'src/**/style/index.scss'
    ]
}


const esDir = path.join(process.cwd(), 'es')
const libDir = path.join(process.cwd(), 'lib')
const distDir = path.join(process.cwd(), 'dist')

function buildTs(modules) {
    const tsProject = ts.createProject('tsconfig.json')
    let error = false
    const tsResult = gulp.src(sources.ts).pipe(tsProject({
        error(err, ts) {
            tsDefaultReporter.error(err, ts)
            error = true
        },
        finish: tsDefaultReporter.finish
    }))

    function check() {
        if (error) {
            this.emit('end')
        }
    }

    tsResult.on('finish', check)
    tsResult.on('end', check)

    const tsd = tsResult.dts.pipe(gulp.dest(modules ? libDir : esDir))
    const js = tsResult.js.pipe(babel(getBabelConfig(modules))).pipe(gulp.dest(modules ? libDir : esDir))
    return merge2([tsd, js])
}

function buildCss(modules) {
    return gulp.src(sources.scss).pipe(sass())
        .on('error', function (error) {
            console.error(error.toString())
            this.emit('end')
        })
        .pipe(postcss())
        .pipe(cleanCSS({
            level: 2,
            format: 'beautify',
        }))
        .pipe(gulp.dest(modules ? libDir : esDir))
}

function compile(modules) {
    fs.removeSync(modules ? libDir : esDir)
    return merge2(buildTs(modules), buildCss(modules))
}

function runTslint() {
    return gulp.src(sources.ts)
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
}

function buildDist(done) {

    webpack(getWebpackConfig(), (err, stats) => {
            if (err) {
                console.error(err.stack || err)
                if (err.details) {
                    console.error(err.details)
                }
                done(err)
                return
            }

            const info = stats.toJson()

            if (stats.hasErrors()) {
                console.error(info.errors)
            }

            if (stats.hasWarnings()) {
                console.warn(info.warnings)
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
        }
    )
}

function buildDistCss() {
    const isProd = process.env.NODE_ENV === 'production'

    return gulp.src("src/style/index.scss").pipe(sass())
        .on('error', function (error) {
            console.error(error.toString())
            this.emit('end')
        })
        .pipe(postcss())
        .pipe(cleanCSS({
            level: 2,
            format: isProd ? 'none' : 'beautify',
        }))
        .pipe(through2.obj(function (file, encoding, next) {
            file.path = file.path.replace(/.css$/, `${isProd ? '.min' : ''}.css`)
            this.push(file)
            next()
        }))
        .pipe(gulp.dest(distDir))
}

gulp.task('compile-es', gulp.series([runTslint, () => {
    return compile(false)
}]))


gulp.task('compile', gulp.series(['compile-es', () => {
    return compile('commonjs')
}]))

gulp.task('dist', gulp.series([()=>{
    return fs.removeSync(distDir)
},buildDist, buildDistCss]))

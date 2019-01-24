const gulp = require('gulp')
const tslint = require('gulp-tslint')
const path = require('path')
const fs = require('fs-extra')
const merge2 = require('merge2')
const through2 = require('through2')
const cleanCss = require('gulp-clean-css')

const compileTs = require('./compile/compileTs')
const compileScss = require('./compile/compileScss')
const compileWebpack = require('./compile/compileWebpack')

const resources = {
    ts: [
        'src/**/*.ts?(x)',
        'src/**/*.d.ts',
        '!src/**/test/*.ts?(x)',
        '!src/**/doc/*.ts?(x)'
    ],
    test: [
        'src/**/test/*.ts?(x)'
    ],
    tslint: [
        'src/**/*.ts?(x)',
        'src/**/*.d.ts'
    ],
    scss: [
        'src/**/style/index.scss',
    ]
}

const esDir = path.join(process.cwd(), 'es')
const libDir = path.join(process.cwd(), 'lib')
const distDir = path.join(process.cwd(), 'dist')

gulp.task('tslint', () => {
    return gulp.src(resources.tslint)
        .pipe(tslint({
            formatter: "verbose",
            configuration: 'tslint.json',
        }))
        .pipe(tslint.report())
})

gulp.task('compile:es', () => {
    fs.removeSync(esDir)
    const tsStream = compileTs(gulp.src(resources.ts))

    const scssStream = compileScss(gulp.src(resources.scss))
        .pipe(cleanCss({
            level: 2,
            format: 'beautify',
        }))
    return merge2([tsStream, scssStream])
        .pipe(gulp.dest(esDir))
})

gulp.task('compile:lib', () => {
    fs.removeSync(libDir)
    const tsStream = compileTs(gulp.src(resources.ts), 'commonjs')

    const scssStream = compileScss(gulp.src(resources.scss))
        .pipe(cleanCss({
            level: 2,
            format: 'beautify',
        }))
    return merge2([tsStream, scssStream])
        .pipe(gulp.dest(libDir))
})

gulp.task('compile', gulp.parallel('compile:lib', 'compile:es'))

gulp.task('dist:uncompressed', () => {
    const scssStream = compileScss(gulp.src('src/style/index.scss'))
        .pipe(cleanCss({
            level: 2,
            format: 'beautify',
        }))
        .pipe(through2.obj(function (file, encoding, next) {
            file.path = file.path.replace(/index.css$/, `style/xl-vision.css`)
            this.push(file)
            next()
        }))

    const webpackStream = compileWebpack(gulp.src(resources.ts), false)
    return merge2([scssStream, webpackStream])
        .pipe(gulp.dest(distDir))
})

gulp.task('dist:compressed', () => {
    const scssStream = compileScss(gulp.src('src/style/index.scss'))
        .pipe(cleanCss({
            level: 2,
            format: 'none',
        }))
        .pipe(through2.obj(function (file, encoding, next) {
            file.path = file.path.replace(/index.css$/, `style/xl-vision.min.css`)
            this.push(file)
            next()
        }))
    const webpackStream = compileWebpack(gulp.src(resources.ts), true)

    return merge2([scssStream, webpackStream])
        .pipe(gulp.dest(distDir))
})

gulp.task('dist', gulp.series(async () => {
    fs.removeSync(distDir)
}, gulp.parallel('dist:compressed', 'dist:uncompressed')))
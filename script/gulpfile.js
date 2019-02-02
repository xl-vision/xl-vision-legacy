const gulp = require('gulp')
const path = require('path')
const fs = require('fs-extra')
const merge2 = require('merge2')
const through2 = require('through2')
const cleanCss = require('gulp-clean-css')

const compileTs = require('./build/compileTs')
const compileScss = require('./build/compileScss')
const runTslint = require('./build/runTslint')
const runWebpack = require('./build/runWebpack')

const resources = {
    ts: [
        'src/components/**/*.ts?(x)',
        'types/**/*.d.ts',
        '!src/components/**/test/*.ts?(x)'
    ],
    test: [
        'src/components/**/test/*.ts?(x)'
    ],
    tslint: [
        'src/components/**/*.ts?(x)',
        'src/components/**/*.d.ts'
    ],
    scss: [
        'src/style/*/*.scss',
        '!src/style/_*/**/*.scss'
    ]
}

const esDir = path.join(process.cwd(), 'es')
const libDir = path.join(process.cwd(), 'lib')
const distDir = path.join(process.cwd(), 'dist')

gulp.task('tslint', () => {
    return runTslint(gulp.src(resources.tslint))
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
    const scssStream = compileScss(gulp.src('src/style/theme-default/index.scss'))
        .pipe(cleanCss({
            level: 2,
            format: 'beautify',
        }))
        .pipe(through2.obj(function (file, encoding, next) {
            file.path = file.path.replace(/index.css$/, `style/xl-vision.css`)
            this.push(file)
            next()
        }))

    const webpackStream = runWebpack(gulp.src('src/components/index.tsx'), false)
    return merge2([scssStream, webpackStream])
        .pipe(gulp.dest(distDir))
})

gulp.task('dist:compressed', () => {
    const scssStream = compileScss(gulp.src('src/style/theme-default/index.scss'))
        .pipe(cleanCss({
            level: 2,
            format: 'none',
        }))
        .pipe(through2.obj(function (file, encoding, next) {
            file.path = file.path.replace(/index.css$/, `style/xl-vision.min.css`)
            this.push(file)
            next()
        }))
    const webpackStream = runWebpack(gulp.src('src/components/index.tsx'), true)

    return merge2([scssStream, webpackStream])
        .pipe(gulp.dest(distDir))
})

gulp.task('dist', gulp.series(async () => {
    fs.removeSync(distDir)
}, gulp.parallel('dist:compressed', 'dist:uncompressed')))
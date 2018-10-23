const gulp = require('gulp')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const cleanCSS = require('gulp-clean-css')
const through2 = require('through2')
const path = require('path')

gulp.task('css', () => {
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
            format: isProd ? 'none' : 'beautify'
        }))
        .pipe(through2.obj(function (file, encoding, next) {
            console.log(file.path)
            file.path = file.path.replace(/.css$/, match => {
                return `${isProd ? '.min' : ''}.css`
            })
            this.push(file)
            next()
        }))
        .pipe(gulp.dest('dist'))
})

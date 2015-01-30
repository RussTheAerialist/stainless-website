var gulp = require('gulp')
var sass = require('gulp-ruby-sass')
var autoprefixer = require('gulp-autoprefixer')
var livereload = require('gulp-livereload')
var jade = require('gulp-jade')
var serv = require('gulp-serv')
var sourcemaps = require('gulp-sourcemaps')
var rsync = require('gulp-rsync')
var browserify = require('gulp-browserify')

gulp.task('sass', function () {
    return sass('src/frontend/styles/main.sass', { sourcemap: true })
        .pipe(sourcemaps.write())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(livereload())
})

gulp.task('jade', function() {
    return gulp.src('src/frontend/templates/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('dist'))
        .pipe(livereload())
})

gulp.task('fonts', function() {
    return gulp.src('src/frontend/fonts/Veggieburger-fontfacekit/web fonts/veggieburger_regular_macroman/*.{eot,ttf,svg,woff}')
        .pipe(gulp.dest('dist/assets/fonts'))
})

gulp.task('images', function() {
    return gulp.src('src/frontend/images/*.{png,jpg}')
        .pipe(gulp.dest('dist/assets/images'))
})

gulp.task('scripts', function() {
    return gulp.src('src/frontend/app.js')
        .pipe(browserify({
            debug: true,
            insertGlobals: true
        }))
        .pipe(gulp.dest('dist/assets'))
})

gulp.task('watch', ['default'], function() {
    livereload.listen()
    gulp.watch('src/frontend/styles/*.sass', ['sass'])
    gulp.watch('src/frontend/templates/*.jade', ['jade'])
    gulp.watch('src/frontend/**/*.js', ['scripts'])
    serv.start({
        root: __dirname + '/dist',
        port: 8000,
        host: '0.0.0.0'
    })
})

gulp.task('default', ['sass', 'fonts', 'scripts', 'images', 'jade'], function() {

})

gulp.task('deploy', ['default'], function() {
    return gulp.src('dist/**')
        .pipe(rsync({
            root: 'dist',
            hostname: 'russellhay.com',
            destination: '/home/www/stainless',
            incremental: true,
            update: true
        }))
})

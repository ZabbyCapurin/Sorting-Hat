let gulp = require('gulp');
let sass = require('gulp-sass');
let cssnano = require('gulp-cssnano');
let browserSync = require('browser-sync').create();
let del = require('del');
let runSequence = require('run-sequence');
let webpackStream = require('webpack-stream');
let react = require('gulp-react');
let webpackConfig = require('./webpack.config');

gulp.task('browserSync', function() {
    browserSync.init({
        injectChanges: true,
        server: {
            baseDir: 'dist'
        }
    })
});

gulp.task('sass', function(){
    return gulp.src('src/styles/*.scss')
        .pipe(sass()) // Using gulp-sass
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('webpackStream', function() {
    return gulp.src('src/scripts/output/*.js')
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('react', function() {
    return gulp.src('src/templates/*.jsx')
        .pipe(react())
        .pipe(gulp.dest('dist/templates'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('copy', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('watch', function() {
    gulp.watch('src/styles/*.scss', ['sass']);
    gulp.watch('src/scripts/**/*.js', ['webpackStream']);
    gulp.watch('src/templates/*.jsx', ['react']);
    gulp.watch('src/*.html', ['copy']);
});

gulp.task('clean:dist', function() {
    return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

gulp.task('default', function (callback) {
    runSequence(['sass', 'react', 'webpackStream', 'browserSync'], 'copy', 'watch',
        callback
    )
});

gulp.task('build', function(callback) {
    runSequence(
      'clean:dist',
      'sass',
      'react',
      'webpackStream',
      ['copy'],
      callback
    )
});
const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync').create();
const del = require('del');
const runSequence = require('run-sequence');
const webpackStream = require('webpack-stream');
const react = require('gulp-react');
const webpackConfig = require('./webpack.config');

gulp.task('browserSync', () => {
  browserSync.init({
    injectChanges: true,
    server: {
      baseDir: 'dist',
    },
  });
});

gulp.task('sass', () => gulp.src('src/styles/*.scss')
  .pipe(sass()) // Using gulp-sass
  .pipe(cssnano())
  .pipe(gulp.dest('dist/styles'))
  .pipe(browserSync.stream({ match: '**/*.css' })));

gulp.task('webpackStream', () => gulp.src('src/scripts/output/*.js')
  .pipe(webpackStream(webpackConfig))
  .pipe(gulp.dest('dist/scripts'))
  .pipe(browserSync.reload({
    stream: true,
  })));

gulp.task('react', () => gulp.src('src/templates/*.jsx')
  .pipe(react())
  .pipe(gulp.dest('dist/templates'))
  .pipe(browserSync.reload({
    stream: true,
  })));
gulp.task('copy', () => gulp.src('src/*.html')
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.reload({
    stream: true,
  })));

gulp.task('watch', () => {
  gulp.watch('src/styles/*.scss', ['sass']);
  gulp.watch('src/scripts/**/*.js', ['webpackStream']);
  gulp.watch('src/templates/*.jsx', ['react']);
  gulp.watch('src/*.html', ['copy']);
});

gulp.task('clean:dist', () => del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']));

gulp.task('default', (callback) => {
  runSequence(
    ['sass', 'react', 'webpackStream', 'browserSync'], 'copy', 'watch',
    callback,
  );
});

gulp.task('build', (callback) => {
  runSequence(
    'clean:dist',
    'sass',
    'react',
    'webpackStream',
    ['copy'],
    callback,
  );
});

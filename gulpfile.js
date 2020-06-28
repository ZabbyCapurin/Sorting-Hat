const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync').create();
const del = require('del');
const runSequence = require('run-sequence');
const webpackStream = require('webpack-stream');
const react = require('gulp-react');
const ghpages = require('gh-pages');
const webpackConfig = require('./webpack.config');

ghpages.publish('dist', (err) => { });

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

gulp.task('clean:dist', (done) => del(['dist/**/*', '!dist/images', '!dist/images/**/*'], done()));

gulp.task('watch', () => {
  gulp.watch('src/styles/*.scss', gulp.series('sass'));
  gulp.watch('src/scripts/**/*.js', gulp.series('webpackStream'));
  gulp.watch('src/templates/*.jsx', gulp.series('react'));
  gulp.watch('src/*.html', gulp.series('copy'));
});

// gulp.task('default', (done) => {
//   gulp.series(
//     gulp.parallel(
//       'sass',
//       'react',
//       'webpackStream',
//     ),
//     'copy',
//     'watch',
//     done,
//   );
// });

gulp.task('build',
  gulp.series(
    'clean:dist',
    gulp.parallel(
      'sass',
      'react',
      'webpackStream',
      'browserSync',
    ),
    'copy',
  ));

gulp.task('default',
  gulp.series(
    'clean:dist',
    'sass',
    'react',
    'webpackStream',
    'copy',
  )
);

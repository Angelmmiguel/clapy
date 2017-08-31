const gulp = require('gulp');
const run = require('gulp-run');
const copy = require('gulp-copy');
const path = require('path');

// Harp path
const harpPath = path.join(__dirname, './node_modules/.bin/harp');

gulp.task('clapyjs', () => {
  return gulp.src('./dist/clapy.js')
    .pipe(copy('./site/js/', { prefix: 1 }));
});

gulp.task('clapycss', () => {
  return gulp.src('./dist/clapy.css')
    .pipe(copy('./site/css/', { prefix: 1 }));
});

gulp.task('compile', ['clapyjs', 'clapycss'], () => {
  return run(`${harpPath} compile site -o dist`).exec();
});

gulp.task('default', ['clapyjs', 'clapycss'], () => {
  gulp.watch('dist/*.js', ['clapyjs']);
  gulp.watch('dist/*.css', ['clapycss']);
  // Server
  run(`${harpPath} server site`).exec();
  console.log('-------------------------------------------------');
  console.log('Harp server is listening on http://localhost:9000');
  console.log('-------------------------------------------------');
});

const gulp = require('gulp');
const run = require('gulp-run');
const copy = require('gulp-copy');
const path = require('path');

// Harp path
const harpPath = path.join(__dirname, './node_modules/.bin/harp');

gulp.task('clapy', () => {
  return gulp.src('./dist/clapy.js')
    .pipe(copy('./site/js/', { prefix: 1 }));
})

gulp.task('compile', ['clapy'], () => {
  return run(`${harpPath} compile site -o dist`).exec();
});

gulp.task('default', ['clapy'], () => {
  gulp.watch('dist/*.js', ['clapy']);
  // Server
  run(`${harpPath} server site`).exec();
  console.log('-------------------------------------------------');
  console.log('Harp server is listening on http://localhost:9000');
  console.log('-------------------------------------------------');
});

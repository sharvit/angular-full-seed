(function() {

  'use strict';

  // dependencies 
  var gulp          = require('gulp');
  
  /**
   * run watchers to auto build source files
   */
  gulp.task('watch:source', function() {
    gulp.watch('app/locales/**/*.json', ['build:locales']);
    gulp.watch('app/styles/**/*.scss', ['build:styles']);
    gulp.watch('app/fonts/**', ['build:fonts']);
    gulp.watch('app/images/**', ['build:images']);
    gulp.watch('./vendor.json', ['build:vendor']);
    gulp.watch('app/src/**/*.html', ['build:templates', 'build:scripts']);
    gulp.watch('app/src/**/*.js', ['build:scripts']);
    gulp.watch('app/index.html', ['build:index']);
  }).help = {
    '': 'run watchers to auto build source files',
    '[ --release ] [ -r ]': 'release mode'
  };

})();
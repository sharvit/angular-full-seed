(function() {

  'use strict';

  var Settings      = require('../../settings.js');
  var errorHandler  = require('../../errorHandler.js');

  // dependencies 
  var gulp          = require('gulp');
  
  
  /**
   * build favicon, copy from root app to root dest
   */
  gulp.task('build:favicon', function() {
    return gulp
      .src(Settings['PATTERNS']['FAV_ICON'])

      .pipe(gulp.dest(Settings['TARGET_DIR']))

      .on('error', errorHandler);
  }).help = {
    '': 'build favicon, copy from root app to root dest',
    '[ --release ] [ -r ]': 'release mode'
  };

})();
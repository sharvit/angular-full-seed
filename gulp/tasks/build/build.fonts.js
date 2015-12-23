(function() {

  'use strict';

  var Settings      = require('../../settings.js');
  var errorHandler  = require('../../errorHandler.js');

  // dependencies 
  var gulp          = require('gulp');
  var path          = require('path');
  
  /**
   * build fonts (just copy them to target destination)
  **/
  gulp.task('build:fonts', function() {
    return gulp
      .src(['app/fonts/*.*'])

      .pipe(gulp.dest(path.join(Settings['TARGET_DIR'], 'fonts')))

      .on('error', errorHandler);
  }).help = {
    '': 'build fonts (just copy them to target destination)',
    '[ --release ] [ -r ]': 'release mode'
  };

})();
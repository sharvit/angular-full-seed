(function() {

  'use strict';

  var Settings      = require('../../settings.js');
  var errorHandler  = require('../../errorHandler.js');

  // dependencies 
  var gulp          = require('gulp');
  var path          = require('path');
  
  /**
   * build images (just copy them to target destination)
   */
  gulp.task('build:images', function() {
    return gulp.src(Settings['PATTERNS']['IMAGES'])
      .pipe(gulp.dest(path.join(Settings['TARGET_DIR'], 'images')))

      .on('error', errorHandler);
  }).help = {
    '': 'build images (just copy them to target destination)',
    '[ --release ] [ -r ]': 'release mode'
  };

})();
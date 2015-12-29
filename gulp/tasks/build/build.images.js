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
    return gulp.src(Settings.config.patterns.images)
      .pipe(gulp.dest(path.resolve(Settings.targetDir, 'images')))

      .on('error', errorHandler);
  }).help = {
    '': 'build images (just copy them to target destination)',
    '[ --release ] [ -r ]': 'release mode'
  };

})();
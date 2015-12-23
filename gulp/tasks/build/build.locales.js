(function() {

  'use strict';

  var Settings      = require('../../settings.js');
  var errorHandler  = require('../../errorHandler.js');

  // dependencies 
  var gulp          = require('gulp');
  var path          = require('path');
  
  /**
   * build locales files (just copy them to target destination)
   */
  gulp.task('build:locales', function () {
    return gulp.src('app/locales/**/*.json')
      .pipe(gulp.dest(path.join(Settings['TARGET_DIR'], 'locales')))

      .on('error', errorHandler);
  }).help = {
    '': 'build locales files (just copy them to target destination)',
    '[ --release ] [ -r ]': 'release mode'
  };

})();
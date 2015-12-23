(function() {

  'use strict';

  var Settings      = require('../../settings.js');
  var errorHandler  = require('../../errorHandler.js');

  // dependencies 
  var gulp          = require('gulp');
  var plugins       = require('gulp-load-plugins')();
  
  /**
   * run live reload watchers on target directory
   */
  gulp.task('watch:target', function() {
    plugins.livereload.listen();
    gulp.watch(Settings['TARGET_DIR'] + '/**')
      .on('change', plugins.livereload.changed)
      .on('error', errorHandler);
  }).help = {
    '': 'run live reload watchers on target directory',
    '[ --release ] [ -r ]': 'release mode'
  };

})();
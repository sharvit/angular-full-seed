(function() {

  'use strict';

  var Settings      = require('../../settings.js');
  var errorHandler  = require('../../errorHandler.js');

  // dependencies 
  var gulp          = require('gulp');
  var path          = require('path');
  var plugins       = require('gulp-load-plugins')();
  
  /**
   * concatenate and minify vendor sources
   */
  gulp.task('build:vendor', function() {
    var dest = path.resolve(Settings.targetDir, 'scripts/vendor');

    return gulp.src(Settings.vendorFiles.scripts)
      .pipe(plugins.concat('vendor.js'))
      .pipe(plugins.if(Settings.release, plugins.uglify()))
      .pipe(plugins.if(Settings.release, plugins.rev()))

      .pipe(gulp.dest(dest))

      .on('error', errorHandler);
  }).help = {
    '': 'concatenate and minify vendor sources',
    '[ --release ] [ -r ]': 'release mode'
  };

})();
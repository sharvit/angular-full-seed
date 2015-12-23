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
    var vendorFiles = require(Settings['VENDOR_PATH']);
    var dest = path.join(Settings['TARGET_DIR'], 'scripts/vendor');

    return gulp.src(vendorFiles)
      .pipe(plugins.concat('vendor.js'))
      .pipe(plugins.if(Settings['RELEASE'], plugins.uglify()))
      .pipe(plugins.if(Settings['RELEASE'], plugins.rev()))

      .pipe(gulp.dest(dest))

      .on('error', errorHandler);
  }).help = {
    '': 'concatenate and minify vendor sources',
    '[ --release ] [ -r ]': 'release mode'
  };

})();
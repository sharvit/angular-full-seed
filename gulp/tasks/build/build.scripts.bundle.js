(function() {

  'use strict';

  var Settings      = require('../../settings.js');

  // dependencies 
  var gulp          = require('gulp');
  var browserify    = require('browserify');
  var source        = require('vinyl-source-stream');
  var buffer        = require('vinyl-buffer');
  var plugins       = require('gulp-load-plugins')();
  
  /**
   * bundle all the src files into scripts/bundle.js
   */
  gulp.task('build:scripts:bundle', function () {
    // set up the browserify instance on a task basis
    var b = browserify({
      entries: Settings.config.files.js,
      debug: Settings.debug
    });

    return b.bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(plugins.sourcemaps.init({loadMaps: true}))
          // Add transformation tasks to the pipeline here.
          .pipe(plugins.ngAnnotate({'single_quotes': true}))
          .on('error', plugins.util.log)
      .pipe(plugins.if(Settings.debug, plugins.sourcemaps.write('./', {sourceRoot: ''})))
      .pipe(gulp.dest(Settings.config.targetDir.tempTargetDir));
  }).help = {
    '': 'bundle all the src files into scripts/bundle.js',
    '[ --release ] [ -r ]': 'release mode'
  };

})();
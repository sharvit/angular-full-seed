(function() {

  'use strict';

  var Settings      = require('../../settings.js');

  // dependencies 
  var gulp          = require('gulp');
  var browserify    = require('browserify');
  var source        = require('vinyl-source-stream');
  var buffer        = require('vinyl-buffer');
  var uglify        = require('gulp-uglify');
  var sourcemaps    = require('gulp-sourcemaps');
  var plugins       = require('gulp-load-plugins')();
  
  /**
   * bundle all the src files into scripts/bundle.js
   */
  gulp.task('build:scripts:bundle', function () {
    // set up the browserify instance on a task basis
    var b = browserify({
      entries: Settings['APP_JS_PATH'],
      debug: Settings['DEBUG']
    });

    return b.bundle()
      .pipe(source('bundle.js'))
      .pipe(plugins.ngAnnotate({'single_quotes': true}))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
          // Add transformation tasks to the pipeline here.
          .pipe(uglify())
          .on('error', plugins.util.log)
      .pipe(plugins.if(Settings['DEBUG'], sourcemaps.write('./')))
      .pipe(gulp.dest(Settings['TEMP_TARGET_DIR']));
  }).help = {
    '': 'bundle all the src files into scripts/bundle.js',
    '[ --release ] [ -r ]': 'release mode'
  };

})();
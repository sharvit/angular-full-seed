(function() {

  'use strict';

  var Settings      = require('../../settings.js');
  var errorHandler  = require('../../errorHandler.js');

  // dependencies 
  var gulp          = require('gulp');
  var plugins       = require('gulp-load-plugins')();
  
  /**
   * build html templates to angularTemplatecache
   */
  gulp.task('build:templates', function() {
    return gulp.src(Settings['PATTERNS']['TEMPLATES'])
      .pipe(plugins.angularTemplatecache('templates.js', {
        root: 'templates/',
        module: Settings['APP_NAME'],
        htmlmin: Settings['RELEASE']
      }))
      .pipe(gulp.dest(Settings['TEMP_TARGET_DIR']))
      .on('error', errorHandler);

  }).help = {
    '': 'build html templates to angularTemplatecache',
    '[ --release ] [ -r ]': 'release mode'
  };

})();
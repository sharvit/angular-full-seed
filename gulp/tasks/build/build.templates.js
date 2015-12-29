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
    return gulp.src(Settings.config.patterns.templates)
      .pipe(plugins.angularTemplatecache('templates.js', {
        root: 'templates/',
        module: Settings.config.appName,
        htmlmin: Settings.release
      }))
      .pipe(gulp.dest(Settings.config.targetDir.tempTargetDir))
      .on('error', errorHandler);

  }).help = {
    '': 'build html templates to angularTemplatecache',
    '[ --release ] [ -r ]': 'release mode'
  };

})();
(function() {

  'use strict';

  var Settings      = require('../settings.js');
  var errorHandler  = require('../errorHandler.js');

  // dependencies 
  var gulp      = require('gulp');
  var plugins   = require('gulp-load-plugins')();

  // devDependencies 
  var stylish;

  // It is posibble to load devDependencies only in development mode
  if (Settings.isDevelopmentMode()) {
    stylish   = require('jshint-stylish');
  }

  /**
   * Lint Tasks
   * lint js sources based on .jshintrc ruleset
   */
  gulp.task('lint', function() {
    return gulp
      .src('app/src/**/*.js')
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter(stylish))
      .on('error', errorHandler);
  }).help = {
    '': 'lint js sources based on .jshintrc ruleset.'
  };

})();
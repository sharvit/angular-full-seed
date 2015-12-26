(function() {

  'use strict';

  var Settings      = require('../../settings.js');
  var errorHandler  = require('../../errorHandler.js');

  // dependencies 
  var gulp          = require('gulp');
  var path          = require('path');
  var plugins       = require('gulp-load-plugins')();
  
  /**
   * precompile .scss files
   */
  gulp.task('build:styles', function() {
    var options = Settings['RELEASE'] ? { style: 'compressed' } : { style: 'expanded' };

    return gulp.src(Settings['APP_SCSS_PATH'])
      .pipe(plugins.sass(options))
      .pipe(plugins.autoprefixer())
      .pipe(plugins.concat('app.css'))
      .pipe(plugins.if(Settings['RELEASE'], plugins.stripCssComments()))
      .pipe(plugins.if(Settings['RELEASE'], plugins.minifyCss()))
      .pipe(plugins.if(Settings['RELEASE'], plugins.rev()))
      .pipe(gulp.dest(path.join(Settings['TARGET_DIR'], 'styles')))
      .on('error', errorHandler);
  }).help = {
    '': 'precompile .scss files',
    '[ --release ] [ -r ]': 'release mode'
  };

})();
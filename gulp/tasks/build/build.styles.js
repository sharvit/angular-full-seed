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
    var options = Settings.release ? { style: 'compressed' } : { style: 'expanded' };

    return gulp.src(Settings.config.files.scss)
      .pipe(plugins.sass(options))
      .pipe(plugins.autoprefixer())
      .pipe(plugins.concat('app.css'))
      .pipe(plugins.if(Settings.release, plugins.stripCssComments()))
      .pipe(plugins.if(Settings.release, plugins.minifyCss()))
      .pipe(plugins.if(Settings.release, plugins.rev()))
      .pipe(gulp.dest(path.resolve(Settings.targetDir, 'styles')))
      .on('error', errorHandler);
  }).help = {
    '': 'precompile .scss files',
    '[ --release ] [ -r ]': 'release mode'
  };

})();
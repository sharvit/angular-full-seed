(function() {

  'use strict';

  var Settings      = require('../../settings.js');
  var errorHandler  = require('../../errorHandler.js');

  // dependencies 
  var gulp          = require('gulp');
  var path          = require('path');
  var streamqueue   = require('streamqueue');
  var plugins       = require('gulp-load-plugins')();

  /**
   * copy scripts, build templatecache, build bundle.
   * if release: concat, minsafe, uglify and versionize
   */
  gulp.task('build:scripts', ['build:scripts:bundle'], function() {
    var dest = path.join(Settings.targetDir, 'scripts/app');

    var scriptStream = gulp
      .src( ['bundle.js', 'bundle.js.map', 'ngConstants.js', 'templates.js' ], { cwd: Settings.config.targetDir.tempTargetDir })

      .pipe(plugins.changed(dest));

    return streamqueue({ objectMode: true }, scriptStream)
      .pipe(plugins.if(Settings.release, plugins.stripDebug()))
      .pipe(plugins.if(Settings.release, plugins.concat('app.js')))
      .pipe(plugins.if(Settings.release, plugins.uglify()))
      .pipe(plugins.if(Settings.release, plugins.rev()))

      .pipe(gulp.dest(dest))

      .on('error', errorHandler);
  }).help = {
    '': 'copy scripts, build templatecache, build bundle.',
    '[ --release ] [ -r ]': 'release mode, concat, minsafe, uglify and versionize',
    'Run': '\n\tbuild:scripts:bundle'
  };

})();
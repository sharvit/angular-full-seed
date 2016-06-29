(function() {

  'use strict';

  var Settings = require('../settings.js');

  // dependencies 
  var gulp  = require('gulp');
  var del   = require('del');

  
  /**
   * Clean Tasks
   */
  gulp.task('clean', ['clean:all']).help = {
    '': 'default clean task, clean all target directories.',
    'Run': '[ clean:all ]'
  };
  gulp.task('clean:all', ['clean:debug', 'clean:release']).help = {
    '': 'clean all target directories.',
    'Run': '[ clean:debug clean:release ]'
  };
  gulp.task('clean:debug', ['clean:tempfiles'], function(done) {
    del(Settings.config.targetDir.releaseTargetDir).then(function () {
      done();
    });
  }).help = {
    '': 'clean debug target directory.'
  };
  gulp.task('clean:release', ['clean:tempfiles'], function(done) {
    del(Settings.config.targetDir.debugTargetDir).then(function () {
      done();
    });
  }).help = {
    '': 'clean release target directory.'
  };
  gulp.task('clean:tempfiles', function(done) {
    del(Settings.config.targetDir.tempTargetDir).then(function () {
      done();
    });
  }).help = {
    '': 'clean the temporary directory.'
  };
  gulp.task('clean:reports', function(done) {
    del(Settings.config.targetDir.reportTragerDir).then(function () {
      done();
    });
  }).help = {
    '': 'clean reports directory'
  };
  gulp.task('clean:target', function(done) {
    del(Settings.targetDir).then(function () {
      done();
    });
  }).help = {
    '': 'clean target directory',
    '[ --release ] [ -r ]': 'release mode'
  };

})();
(function() {

  'use strict';

  // dependencies 
  var gulp          = require('gulp');
  var runSequence   = require('run-sequence');
  
  /**
   * build the app and run all e2e tests
   */
  gulp.task('test:e2e', function(done) {
    runSequence(
      'build',
      'test:e2e:run-protractor-server',
      done
    );
  }).help = {
    '': 'build the app and run all e2e tests',
    '[ --release ] [ -r ]': 'release mode',
    'Run': [
      '',
      'build',
      'test:e2e:run-protractor-server'
    ].join('\n\t')
  };

})();
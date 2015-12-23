(function() {

  'use strict';

  // dependencies 
  var gulp          = require('gulp');
  var runSequence   = require('run-sequence');
  
  /**
   * build the app and run all unit tests
   */
  gulp.task('test:unit', function(done) {
    runSequence(
      'build',
      'test:unit:run-karma-server',
      done
    );
  }).help = {
    '': 'build the app and run all unit tests',
    '[ --release ] [ -r ]': 'release mode',
    'Run': [
      '',
      'build',
      'test:unit:run-karma-server'
    ].join('\n\t')
  };

})();
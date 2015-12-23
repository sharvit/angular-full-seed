(function() {

  'use strict';

  var Settings = require('../../settings.js');

  // dependencies 
  var gulp  = require('gulp');
  var runSequence   = require('run-sequence');

  
  /**
   * Tests Tasks
   */
  gulp.task('test', function(done) {
    runSequence(
      'test:unit',
      'test:e2e',
      done
    );
  }).help = {
    '': 'build the app and run all tests (unit, e2e)',
    '[ --release ] [ -r ]': 'release mode',
    '[ --port=PORT ] [ -p=PORT ]': 'set the web server port. default to ' + Settings.DEFAULT_PORT,
    'Run': [
      '',
      'test:unit',
      'test:e2e'
    ].join('\n\t')
  };

})();
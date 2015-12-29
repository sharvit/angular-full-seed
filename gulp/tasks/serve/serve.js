(function() {

  'use strict';

  var Settings = require('../../settings.js');

  // dependencies 
  var gulp          = require('gulp');
  var runSequence   = require('run-sequence');
  
  /**
   * build, watch, run development server and open the browser
   */
  gulp.task('serve', function(done) {
    runSequence(
      'build',
      'watch',
      'serve:runserver',
      done
    );
  }).help = {
    '': 'build, watch, run development server and open the browser',
    '[ --release ] [ -r ]': 'release mode',
    '[ --port=PORT ] [ -p=PORT ]': 'set the web server port. default to ' + Settings.config.defaultPort,
    'Run': [
      '',
      'build',
      'watch',
      'serve:runserver'
    ].join('\n\t')
  };

})();
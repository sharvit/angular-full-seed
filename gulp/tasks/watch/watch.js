(function() {

  'use strict';

  // dependencies 
  var gulp          = require('gulp');
  
  /**
   * run watchers to auto build source files and live reload browser
   */
  gulp.task('watch', [
    'watch:source',
    'watch:target'
  ]).help = {
    '': 'run watchers to auto build source files and live reload browser',
    '[ --release ] [ -r ]': 'release mode',
    'Run': [
      '',
      'watch:source',
      'watch:target'
    ].join('\n\t')
  };

})();
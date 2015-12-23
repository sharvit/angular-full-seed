(function() {

  'use strict';

  var gulp    = require('gulp');
  var ghelp   = require('gulp-showhelp');

  /**
   * Help Tasks
   * Tasks to show when using 'gulp help'
  **/
  var helpTasks = [
    '',
    'help',
    '',
    '',
    'serve',
    '',
    'serve:runserver',
    '',
    '',
    'build',
    '',
    'build:clean-target',
    'build:locales',
    'build:favicon',
    'build:fonts',
    'build:templates',
    'build:styles',
    'build:images',
    'build:vendor',
    'build:scripts',
    'build:scripts:bundle',
    'build:index',
    '',
    '',
    'watch',
    '',
    'watch:source',
    'watch:target',
    '',
    '',
    'test',
    '',
    'test:unit',
    'test:unit:run-karma-server',
    '',
    'test:e2e',
    'test:e2e:run-protractor-server',
    '',
    '',
    'clean',
    '',
    'clean:all',
    'clean:debug',
    'clean:release',
    '',
    '',
    'lint'
  ];

  /**
   * Task:
   *    gulp help
   * Description:
   * 
  **/
  gulp.task('help', function() {
    var task = ghelp.getArgv('task', 't');
    if (task !== null) {
      ghelp.show(task);
    } else {
      ghelp.show(helpTasks);
    }
  }).help = {
    '': 'shows this help message.',
    '[ --task=t ] [ -t=t ]': 'specifys a task shown.'
  };

})();
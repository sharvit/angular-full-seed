(function() {

  'use strict';

  var gulp = require('gulp');
  var path = require('path');

  // Require all tasks.
  var tasks = require('require-dir')(
    path.resolve(__dirname, 'gulp/tasks'),
    { recurse: true }
  );

  /**
   * Default Task
  **/
  gulp.task('default', ['help']);

  /**
   * start run the build proccess
   */
  gulp.task('build', tasks.build.build.task).help = tasks.build.build.help;

  // no-op = no operation
  gulp.task('private:noop', function () { });

})();

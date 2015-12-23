(function() {

  'use strict';

  var gulp = require('gulp');
  var path = require('path');

  // Require all tasks.
  require('require-dir')(
    path.resolve(__dirname, 'gulp/tasks'),
    { recurse: true }
  );

  /**
   * Default Task
  **/
  gulp.task('default', ['help']);

  // no-op = no operation
  gulp.task('private:noop', function () { });

})();

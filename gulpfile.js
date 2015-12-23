(function() {

  'use strict';

  var gulp = require('gulp');

  // Require all tasks.
  require('require-dir')(
    './gulp/tasks',
    { recurse: true }
  );

  /**
   * Default Task
  **/
  gulp.task('default', ['help']);

  // no-op = no operation
  gulp.task('private:noop', function () { });

})();

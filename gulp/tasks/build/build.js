(function() {

  'use strict';

  var Settings = require('../../settings.js');

  // dependencies 
  var gulp          = require('gulp');
  var runSequence   = require('run-sequence');

  gulp.task('build', function (done) {
    runSequence(
      'clean:tempfiles',
      'clean:target',
      [
        Settings['DEBUG'] ? 'lint' : 'private:noop',
        'build:locales',
        'build:favicon',
        'build:fonts',
        'build:templates',
        'build:styles',
        'build:images',
        'build:vendor'
      ],
      'build:scripts',
      'build:index',
      'clean:tempfiles',
      done
    );
  }).help = {
    '': 'start run the build proccess',
    '[ --release ] [ -r ]': 'release mode',
    'Run': [
      '',
      'clean:tempfiles',
      'clean:target',
      [
        '[',
        'lint if release?',
        'build:locales',
        'build:favicon',
        'build:fonts',
        'build:templates',
        'build:styles',
        'build:images',
        'build:vendor'
      ].join('\n\t\t'),
      ']',
      'build:scripts',
      'build:index',
      'clean:tempfiles'
    ].join('\n\t')
  };

})();
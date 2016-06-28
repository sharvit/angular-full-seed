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
      'build:icon-fonts',
      [
        'favicon:check-for-updates',
        Settings.debug ? 'lint' : 'private:noop',
        'build:config',
        'build:locales',
        'build:favicon',
        'build:fonts',
        'build:icons',
        'build:templates',
        'build:styles',
        'build:images',
        'build:vendor'
      ],
      'build:scripts',
      'build:index',
      Settings.release ? 'clean:tempfiles' : 'private:noop',
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
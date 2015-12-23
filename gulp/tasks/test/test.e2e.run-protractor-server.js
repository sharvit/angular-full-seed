(function() {

  'use strict';

  var Settings = require('../../settings.js');

  // dependencies 
  var gulp          = require('gulp');

  // devDependencies 
  var gulpWebserver, angularProtractor;

  // It is posibble to load devDependencies only in development mode
  if (Settings.isDevelopmentMode()) {
    gulpWebserver       = require('gulp-webserver');
    angularProtractor   = require('gulp-angular-protractor');
  }
  
  /**
   * run protractor server and run all e2e tests
   */
  gulp.task('test:e2e:run-protractor-server', function (done) {

    // Start dev server
    var devServerStrean = gulp.src(Settings['TARGET_DIR'])
      .pipe(gulpWebserver({
        path: '/',
        fallback: 'index.html',
        port: Settings['PORT']
      }))
    ;

    gulp.src(['./e2e-tests/*.spec.js'])
      .pipe(angularProtractor({
        'configFile': Settings['PROTRACTOR_CONFIG_FILE'],
        'args': ['--baseUrl', 'http://localhost:' + Settings['PORT']],
        'autoStartStopServer': true,
        'debug': true
      }))
      .on('error', function () {
        throw 'e2e tests Failed!';
      })
      .on('end', function () {
        // Kill the dev server
        devServerStrean.emit('kill');

        done();
      });

  }).help = {
    '': 'run protractor server and run all e2e tests',
    '[ --release ] [ -r ]': 'release mode'
  };

})();
(function() {

  'use strict';

  var Settings = require('../../settings.js');

  // dependencies 
  var gulp          = require('gulp');

    // devDependencies 
  var gulpWebserver;

  // It is posibble to load devDependencies only in development mode
  if (Settings.isDevelopmentMode()) {
    gulpWebserver       = require('gulp-webserver');
  }
  
  /**
   * run development server and open the browser
   */
  gulp.task('serve:runserver', function() {
    gulp.src(Settings['TARGET_DIR'])
      .pipe(gulpWebserver({
        path: '/',
        fallback: 'index.html',
        port: Settings['PORT'],
        livereload: true,
        open: true
      }));
  }).help = {
    '': 'run development server and open the browser',
    '[ --release ] [ -r ]': 'release mode',
    '[ --port=PORT ] [ -p=PORT ]': 'set the web server port. default to ' + Settings['DEFAULT_PORT']
  };

})();
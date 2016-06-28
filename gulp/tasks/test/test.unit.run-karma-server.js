(function() {

  'use strict';

  var Settings = require('../../settings.js');

  // dependencies 
  var gulp  = require('gulp');
  
  // devDependencies 
  var karmaServer;

  // It is posibble to load devDependencies only in development mode
  if (Settings.isDevelopmentMode()) {
    karmaServer   = require('karma').Server;
  }

  
  /**
   * run karma server and start run unit testing
   */
  gulp.task('test:unit:run-karma-server', function (done) {
    new karmaServer({
      configFile: Settings.config.test.configFiles.karmaConfigFile,
      singleRun: true
    }, done).start();
  }).help = {
    '': 'run karma server and start run unit testing'
  };

})();
(function() {

  'use strict';

  var Settings  = require('./settings.js');

  var plugins   = require('gulp-load-plugins')();
  var beep      = require('beepbeep');

  // global error handler
  function errorHandler (error) {
    if (Settings['RELEASE']) {
      throw error;
    } else {
      beep(2, 170);
      plugins.util.log(error);
    }
  }

  module.exports = errorHandler;

})();
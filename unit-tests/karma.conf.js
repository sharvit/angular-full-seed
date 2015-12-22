(function() {
  'use strict';

  module.exports = function (config) {
    var cfg = {

      basePath : '../build/debug',

      files : [
        'scripts/vendor/*.js',
        'scripts/app/*.js',

        '../../bower_components/angular-mocks/angular-mocks.js',

        '../../unit-tests/**/*.spec.js'
      ],

      autoWatch : true,

      frameworks: ['jasmine'],

      browsers : ['Chrome'],

      plugins : [
        'karma-chrome-launcher',
        'karma-firefox-launcher',
        'karma-jasmine',
        'karma-junit-reporter'
      ],

      customLaunchers: {
        'Chrome_travis_ci': {
          base: 'Chrome',
          flags: ['--no-sandbox']
        }
      },

      junitReporter : {
        outputFile: 'test_out/unit.xml',
        suite: 'unit'
      }

    };

    if (process.env.TRAVIS) {
      cfg.browsers = ['Chrome_travis_ci', 'Firefox'];
    }

    config.set(cfg);

  };

})();

'use strict';

module.exports = function (config) {
  config.set({

    basePath : './build/debug',

    files : [
      'vendor*.js',
      'scripts/*.js',

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
  });
};
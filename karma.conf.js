'use strict';

module.exports = function (config) {
  config.set({

    basePath : './',

    files : [
      'build/debug/vendor.js',
      'build/debug/scripts/bundle.js',

      'bower_components/angular-mocks/angular-mocks.js',

      'unit-tests/**/*.spec.js'
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

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};
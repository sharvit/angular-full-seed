
'use strict';

module.exports = function (config) {

  var cfg = {

    basePath : './',

    files : [
      'build/debug/scripts/vendor/*.js',
      'build/debug/scripts/app/*.js',

      'bower_components/angular-mocks/angular-mocks.js',

      // the test spec files
      'app/src/**/*.spec.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    reporters: ['progress', 'coverage'],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'build/debug/scripts/app/bundle.js': ['coverage']
    },

    coverageReporter: {
      type : 'json',
      subdir : '.',
      dir : 'build/reporters/coverage/',
      file : 'coverage-bundle.json'
    },

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-coverage'
    ],

    customLaunchers: {
      'Chrome_travis_ci': {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }

  };

  if (process.env.TRAVIS) {
    cfg.browsers = ['Chrome_travis_ci'];
  }

  config.set(cfg);

};
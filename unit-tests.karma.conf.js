
'use strict';

module.exports = function (config) {

  var cfg = {

    basePath : './',

    files : [
      'build/debug/scripts/vendor/*.js',
      'build/debug/scripts/app/*.js',

      'bower_components/angular-mocks/angular-mocks.js',

      'app/src/**/*.spec.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    reporters: ['dots', 'coverage', 'karma-remap-istanbul'],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'build/debug/scripts/app/bundle.js': ['coverage']
    },

    coverageReporter: {
      type : 'json',
      subdir : '.',
      dir : 'coverage/',
      file : 'coverage.json'
    },

    remapIstanbulReporter: {
      src: 'coverage/coverage.json',

      reports: {
        lcovonly: 'coverage/lcov.info',
        html: 'coverage/html/report',
        json: 'coverage/coverage.json'
      }
    },

    customLaunchers: {
      'Chrome_travis_ci': {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }

  };

  if (process.env.TRAVIS) {
    cfg.browsers = ['Chrome_travis_ci', 'Firefox'];
  }

  config.set(cfg);

};
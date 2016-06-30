
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

    reporters: ['progress', 'coverage', 'karma-remap-istanbul'],

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
      file : 'coverage.json'
    },

    remapIstanbulReporter: {
      src: 'build/reporters/coverage/coverage.json',

      reports: {
        lcovonly: 'build/reporters/coverage/lcov.info',
        html: 'build/reporters/coverage/html/report',
        json: 'build/reporters/coverage/coverage.json'
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
    cfg.browsers = ['Chrome_travis_ci'];
  }

  config.set(cfg);

};
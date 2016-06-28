
'use strict';

module.exports = function (config) {

  var cfg = {

    basePath : './build/debug',

    files : [
      'scripts/vendor/*.js',
      'scripts/app/*.js',

      '../../bower_components/angular-mocks/angular-mocks.js',

      '../../app/src/**/*.spec.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    reporters: ['dots', 'coverage'],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'scripts/app/*.js': ['coverage']
    },

    // Configure code coverage reporter
    coverageReporter: {
      dir : '../reporters/coverage/',
      reporters: [
        // reporters not supporting the `file` property
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        // reporters supporting the `file` property, use `subdir` to directly
        // output them in the `dir` directory
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
        { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
        { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
        { type: 'text', subdir: '.', file: 'text.txt' },
        { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
      ]
    },



    plugins : [
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
    cfg.basePath = './build/release';
    cfg.browsers = ['Chrome_travis_ci', 'Firefox'];
  }

  console.log(cfg);

  config.set(cfg);

};
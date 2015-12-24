(function() {
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

      plugins : [
        'karma-chrome-launcher',
        'karma-firefox-launcher',
        'karma-jasmine'
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

    config.set(cfg);

  };

})();

(function() {
  'use strict';

  var cfg = {
    allScriptsTimeout: 11000,

    specs: [
      '*.spec.js'
    ],

    capabilities: {
      'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:8888',

    framework: 'jasmine',

    jasmineNodeOpts: {
      defaultTimeoutInterval: 30000
    }
  };

  if (process.env.TRAVIS) {
    cfg.sauceUser = process.env.SAUCE_USERNAME;
    cfg.sauceKey = process.env.SAUCE_ACCESS_KEY;
    cfg.capabilities = {
      'browserName': 'chrome',
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
      'build': process.env.TRAVIS_BUILD_NUMBER
    };
  }

  exports.config = cfg;

})();
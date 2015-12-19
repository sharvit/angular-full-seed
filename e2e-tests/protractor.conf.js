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
    cfg.capabilities = {
      'browserName': 'firefox'
    };
  }

  exports.config = cfg;

})();
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
    cfg.multiCapabilities = [{
      'browserName': 'firefox'
    }, {
      'browserName': 'chrome'
    }];
  }

  exports.config = cfg;

})();
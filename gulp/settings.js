(function() {
  'use strict';

  var path = require('path');

  var ROOT_PATH = path.resolve(__dirname, '../');

  /**
   * Settings
   */
  var SETTINGS = {
    APP_NAME                  :   'app',
    TEMP_TARGET_DIR           :   './build/.tmp',
    DEBUG_TARGET_DIR          :   './build/debug',
    RELEASE_TARGET_DIR        :   './build/release',
    DEFAULT_PORT              :   8888,
    ROOT_PATH                 :   ROOT_PATH,
    VENDOR_PATH               :   path.resolve(ROOT_PATH, 'vendor.json'),
    KARMA_CONFIG_FILE         :   path.resolve(ROOT_PATH, 'unit-tests.karma.conf.js'),
    PROTRACTOR_CONFIG_FILE    :   path.resolve(ROOT_PATH, 'e2e-tests/protractor.conf.js')
  };

  // Load .env file if exists
  // Require all vars from .env.example to be exist in env.proccess
  // otherwise it will throw errors!
  // For development/test we want to load env vars from .env file
  // For production we dont want .env file, we want the server env system
  require('dotenv-safe').load();

  /**
   * Parse arguments
   */
  var args = require('yargs')
    .alias('r', 'release')
    .alias('p', 'port')
    .default('release', false)
    .default('port', SETTINGS['DEFAULT_PORT'])
    .argv;

  var release = !!args.release;
  var port = args.port;

  // Add some more information
  SETTINGS['TARGET_DIR']            =   require('path').resolve(release ? SETTINGS['RELEASE_TARGET_DIR'] : SETTINGS['DEBUG_TARGET_DIR']);
  SETTINGS['PORT']                  =   port;
  SETTINGS['ENV']                   =   process.env['NODE_ENV'];
  SETTINGS['RELEASE']               =   release;
  SETTINGS['DEBUG']                 =   !release;
  SETTINGS['isProductionMode']      =   function () { return process.env['NODE_ENV'] === 'production'; };
  SETTINGS['isDevelopmentMode']     =   function () { return process.env['NODE_ENV'] !== 'production'; };

  console.log('SETTINGS', SETTINGS);

  // export the settings object
  module.exports = SETTINGS;

})();
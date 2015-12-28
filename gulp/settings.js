(function() {

    'use strict';

    var path = require('path');

    var ROOT_PATH = path.resolve(__dirname, '../');

    /**
    * Settings
    */
    var SETTINGS = {
        APP_NAME                  :     'app',
        TEMP_TARGET_DIR           :     './build/.tmp',
        DEBUG_TARGET_DIR          :     './build/debug',
        RELEASE_TARGET_DIR        :     './build/release',
        DEFAULT_PORT              :     8888,
        APP_PATH                  :     path.resolve(ROOT_PATH, 'app'),
        SRC_PATH                  :     path.resolve(ROOT_PATH, 'app/src'),
        APP_JS_PATH               :     path.resolve(ROOT_PATH, 'app/src/app.js'),
        SCSS_PATH                 :     path.resolve(ROOT_PATH, 'app/styles'),
        APP_SCSS_PATH             :     path.resolve(ROOT_PATH, 'app/styles/app.scss'),
        FONTS_PATH                :     path.resolve(ROOT_PATH, 'app/fonts'),
        BOOTSTRAP_FONTS_PATH      :     path.resolve(ROOT_PATH, 'bower_components/bootstrap-sass/assets/fonts/bootstrap'),
        IMAGES_PATH               :     path.resolve(ROOT_PATH, 'app/images'),
        INDEX_PATH                :     path.resolve(ROOT_PATH, 'app/index.html'),
        CONFIG_PATH               :     path.resolve(ROOT_PATH, 'config'),
        LOCALES_PATH              :     path.resolve(ROOT_PATH, 'config/locales'),
        VENDOR_PATH               :     path.resolve(ROOT_PATH, 'vendor.json'),
        PACKAGE_PATH              :     path.resolve(ROOT_PATH, 'package.json'),
        BOWER_PATH                :     path.resolve(ROOT_PATH, 'bower.json'),
        KARMA_CONFIG_FILE         :     path.resolve(ROOT_PATH, 'unit-tests.karma.conf.js'),
        PROTRACTOR_CONFIG_FILE    :     path.resolve(ROOT_PATH, 'e2e-tests', 'protractor.conf.js')
    };

    /**
    * Patterns
    */
    SETTINGS['PATTERNS'] = {
        JS                        :     path.resolve(SETTINGS['SRC_PATH'],          '**/*.js'),
        TEMPLATES                 :     path.resolve(SETTINGS['SRC_PATH'],          '**/*.html'),
        IMAGES                    :     path.resolve(SETTINGS['IMAGES_PATH'],       '**/*.*'),
        FAV_ICON                  :     path.resolve(SETTINGS['APP_PATH'],          '*.*ico'),
        STYLES                    :     path.resolve(SETTINGS['SCSS_PATH'],         '**/*.scss'),
        LOCALES                   :     path.resolve(SETTINGS['LOCALES_PATH'],      '**/*.json'),
        FONTS                     :     [
            path.resolve(SETTINGS['FONTS_PATH'],                    '*.*'),
            path.resolve(SETTINGS['BOOTSTRAP_FONTS_PATH'],          '*.*')
        ],

        // Use that way:
        //      Settings['PATTERNS']['LOCALE_REPLACE'].replace(/{{locale}}/g, 'en')
        LOCALE_REPLACE            :     path.resolve(SETTINGS['LOCALES_PATH'],      '{{locale}}/*.json')
    };

    // add the root path into the settings
    SETTINGS['ROOT_PATH']       =   ROOT_PATH;
    // load the vendor files pathes from vendor.json
    SETTINGS['VENDOR_FILES']    =   require(SETTINGS['VENDOR_PATH']);
    // load package.json file
    SETTINGS['PACKAGE_JSON']    =   require(SETTINGS['PACKAGE_PATH']);
    // load bower.json file
    SETTINGS['BOWER_JSON']      =   require(SETTINGS['PACKAGE_PATH']);

    // Load .env file if exists
    // Require all vars from .env.example to be exist in env.proccess
    // otherwise it will throw errors!
    // For local development/test we want to load env vars from .env file
    // For production we dont want .env file, we want the server env system
    require('dotenv-safe').load();

    // Load the enviorment to the settings
    SETTINGS['ENV'] =  process.env['NODE_ENV'];

    // load configuration files
    SETTINGS['CONFIGURATION'] = require('./configLoader')(SETTINGS['CONFIG_PATH'], SETTINGS['ENV']);

    // Inject the version from the package.json to the configuration
    SETTINGS['CONFIGURATION'].version = SETTINGS['PACKAGE_JSON'].version;

    /**
    * Parse arguments
    */
    var args = require('yargs')
        .alias('r', 'release')
        .alias('p', 'port')
        .default('release', false)
        .default('port', SETTINGS['DEFAULT_PORT'])
        .argv
    ;

    var release  = !!args.release;
    var port     = args.port;

    // Decide about the target dir
    SETTINGS['TARGET_DIR']            =   require('path').resolve(release ? SETTINGS['RELEASE_TARGET_DIR'] : SETTINGS['DEBUG_TARGET_DIR']);

    // Add some more information
    SETTINGS['PORT']                  =   port;
    SETTINGS['RELEASE']               =   release;
    SETTINGS['DEBUG']                 =   !release;
    SETTINGS['isProductionMode']      =   function () { return SETTINGS['ENV'] === 'production'; };
    SETTINGS['isDevelopmentMode']     =   function () { return SETTINGS['ENV'] !== 'production'; };

    // export the settings object
    module.exports = SETTINGS;
})();
(function() {

    'use strict';

    var gulp            =   require('gulp');
    var path            =   require('path');
    var objectExtend    =   require('object-extend');

    var ROOT_PATH       =   path.resolve(__dirname, '../');

    var CONFIG_PATH     =   './config.json';

    // Load .env file if exists
    // Require all vars from .env.example to be exist in env.proccess
    // otherwise it will throw errors!
    // For local development/test we want to load env vars from .env file
    // For production we dont want .env file, we want the server env system
    require('dotenv-safe').load();


    function Settings (configFile) {
        var self = this;

        self.config         =   require(configFile);
        self.env            =   process.env['NODE_ENV'];
        self.rootPath       =   ROOT_PATH;
        self.configPath     =   CONFIG_PATH;

        self.fixConfigPathesToRoot();
        self.loadGulpConfigFiles();
        self.loadAppConfig();
        self.loadArguments();
    }

    Settings.prototype = {

        loadAppConfig           :   loadAppConfig,

        loadGulpConfigFiles     :   loadGulpConfigFiles,
        loadVendorFiles         :   loadVendorFiles,
        loadPackage             :   loadPackage,
        loadBower               :   loadBower,
        loadFaviconGenerate     :   loadFaviconGenerate,

        fixConfigPathesToRoot   :   fixConfigPathesToRoot,

        loadEnvironmentConfig   :   loadEnvironmentConfig,

        loadArguments           :   loadArguments,
        resolveTargetDir        :   resolveTargetDir,

        isProductionMode        :   isProductionMode,
        isDevelopmentMode       :   isDevelopmentMode
    };

    function fixConfigPathesToRoot () {
        var self = this;

        self.config.test.configFiles.karmaConfigFile         = path.resolve(ROOT_PATH, self.config.test.configFiles.karmaConfigFile);
        self.config.test.configFiles.protractorConfigFile    = path.resolve(ROOT_PATH, self.config.test.configFiles.protractorConfigFile);
    }

    function loadArguments () {
        var self = this;

        self.args = require('yargs')
            .alias('r', 'release')
            .alias('p', 'port')
            .default('release', false)
            .default('port', self.config.defaultPort)
            .argv
        ;

        self.port       =   self.args.port;
        self.release    =   !!self.args.release;
        self.debug      =   !self.release;

        self.resolveTargetDir();
    }

    function loadAppConfig () {
        var self = this;

        // Require all config files.
        var config = require('require-dir')(
            path.resolve(ROOT_PATH, self.config.folders.config),
            { recurse: false }
        );

        // Load the relevant environment config
        var envConfig = self.loadEnvironmentConfig();

        // Extend the config with the envConfig
        // so envConfigs will remove fields at the original config
        config = objectExtend(config, envConfig);

        // Return the final config formated
        self.appConfig = formatAppConfig(config);

        // Inject the version from the package.json to the configuration
        self.appConfig.env = self.env;

        // Inject the version from the package.json to the configuration
        self.appConfig.version = self.package.version;
    }

    function loadGulpConfigFiles () {
        var self = this;

        self.loadVendorFiles();
        self.loadPackage();
        self.loadBower();
        self.loadFaviconGenerate();
    }

    function loadVendorFiles () {
        var self = this;

        self.vendorFiles = require(
            path.resolve(ROOT_PATH, self.config.configFiles.vendor)
        );
    }

    function loadPackage () {
        var self = this;

        self.package = require(
            path.resolve(ROOT_PATH, self.config.configFiles.package)
        );
    }

    function loadBower () {
        var self = this;

        self.bower = require(
            path.resolve(ROOT_PATH, self.config.configFiles.bower)
        );
    }

    function loadFaviconGenerate () {
        var self = this;

        self.faviconGenerateConfig = require(
            path.resolve(ROOT_PATH, self.config.configFiles.favicons.generate)
        );

        self.faviconGenerateConfig.masterPicture    = self.config.resources.favicon;
        self.faviconGenerateConfig.dest             = self.config.folders.favicons;
        self.faviconGenerateConfig.markupFile       = self.config.configFiles.favicons.build;
    }

    function resolveTargetDir () {
        var self = this;

        self.targetDir = path.resolve(
            ROOT_PATH,
            self.release ? self.config.targetDir.releaseTargetDir : self.config.targetDir.debugTargetDir
        );
    }

    function loadEnvironmentConfig () {
        var self = this;

        return require(
            path.resolve(
                self.config.folders.environments,
                self.env + '.json'
            )
        );
    }

    function isProductionMode () {
        var self = this;

        return self.env === 'production';
    }

    function isDevelopmentMode () {
        var self = this;

        return self.env !== 'production';
    }

    // change the object keys to upper case underscoe
    // { 'app.config': {...} } to { 'APP_CONFIG': {...} }
    function formatAppConfig (obj) {
        var formatedObj = {};

        for (var key in obj) {
            var newKey = key.replace(/\./g, '_').toUpperCase();

            formatedObj[newKey] = obj[key];
        }

        return formatedObj;
    }

    var _settings = new Settings(CONFIG_PATH);

    gulp.task('settings:reload-app-config', function() {
        return _settings.loadAppConfig();
    });

    gulp.task('settings:reload-vendor-files', function() {
        return _settings.loadVendorFiles();
    });

    // export settings object
    module.exports = _settings;
})();
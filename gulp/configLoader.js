(function() {

    'use strict';

    var ENV_FOLDER_NAME = 'environments';

    var path            = require('path');
    var objectExtend    = require('object-extend');

    // Load configurations from config folder
    function configLoader (configFolder, environment) {
        // Require all config files.
        var config = require('require-dir')(
            configFolder,
            { recurse: false }
        );

        // Load the relevant environment config
        var envConfig = loadEnvironmentConfig(configFolder, environment);

        // Extend the config with the envConfig
        // so envConfigs will remove the original config
        config = objectExtend(config, envConfig);

        // Return the final config formated
        return formatConfig(config);
    }

    function loadEnvironmentConfig (configFolder, environment) {
        return require(
            path.resolve(
                configFolder,
                ENV_FOLDER_NAME,
                environment + '.json'
            )
        );
    }

    // change the object keys to upper case underscoe
    // { 'app.config': {...} } to { 'APP_CONFIG': {...} }
    function formatConfig (obj) {
        var formatedObj = {};

        for (var key in obj) {
            var newKey = key.replace('.', '_').toUpperCase();

            formatedObj[newKey] = obj[key];
        }

        return formatedObj;
    }

    module.exports = configLoader;
})();
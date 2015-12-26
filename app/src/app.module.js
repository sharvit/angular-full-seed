(function() {
    'use strict';

    /**
    *
    * Main module of the application.
    *
    */
    angular
        .module('app', [
            'app.core',

            'app.services',

            'app.components',

            'app.layout',
            'app.states'
        ])
    ;

    require('./core/core.module.js');
    require('./services/services.module.js');
    require('./components/components.module.js');
    require('./layout/layout.module.js');
    require('./states/states.module.js');
})();
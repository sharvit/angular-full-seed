(function() {
    'use strict';

    angular
        .module('app.components.version', [

        ])

        .value('version', '0.0.1')
    ;

    require('./app-version.directive.js');
})();

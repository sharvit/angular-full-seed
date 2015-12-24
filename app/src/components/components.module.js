(function() {
    'use strict';

    angular
        .module('app.components', [
            'app.components.version'
        ])
    ;

    require('./version/version.module.js');
})();
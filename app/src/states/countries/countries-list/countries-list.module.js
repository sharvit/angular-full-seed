(function() {
    'use strict';

    angular
        .module('app.states.countries.countries-list', [
            'app.core'
        ])
    ;

    require('./countries-list.config.js');
    require('./countries-list.controller.js');
})();
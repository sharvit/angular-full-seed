(function() {
    'use strict';

    angular
        .module('app.states.countries.list', [
            'app.core'
        ])
    ;

    require('./list.config.js');
    require('./list.controller.js');
})();
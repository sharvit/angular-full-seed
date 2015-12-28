(function() {
    'use strict';

    angular
        .module('app.components', [
            'app.components.version',
            'app.components.countries'
        ])
    ;

    require('./version/version.module.js');
    require('./countries/countries.module.js');
})();
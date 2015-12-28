(function() {
    'use strict';

    angular
        .module('app.states.countries')

        .config(config)
    ;

    /* @ngInject */
    function config ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('/countries', '/countries/all');

        $stateProvider.state('app.countries', {
            url: '/countries',
            templateUrl: 'templates/states/countries/countries.html'
        });
    }
    
})();
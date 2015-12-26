(function() {
    'use strict';

    angular
        .module('app.states.countries')

        .config(config)
    ;

    /* @ngInject */
    function config ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('/countries', '/countries/list');

        $stateProvider.state('app.countries', {
            abstract: true,
            url: '/countries',
            templateUrl: 'templates/states/countries/countries.html'
        });
    }
    
})();
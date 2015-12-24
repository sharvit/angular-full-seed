(function() {
    'use strict';

    angular
        .module('app.states.dashboard')

        .config(config)
    ;

    /* @ngInject */
    function config ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('/dashboard', '/dashboard/state1');

        $stateProvider.state('app.dashboard', {
            abstract: true,
            url: '/dashboard',
            templateUrl: 'templates/states/dashboard/dashboard.html'
        });
    }
    
})();
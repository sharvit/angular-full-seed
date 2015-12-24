(function() {
    'use strict';

    angular
        .module('app.core')

        .config(config)
    ;

    /* @ngInject */
    function config ($urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/login');

        $locationProvider.html5Mode(true);
    }

})();
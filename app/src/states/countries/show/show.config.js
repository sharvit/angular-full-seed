(function() {
    'use strict';

    angular
        .module('app.states.countries.show')

        .config(config)
    ;

    /* @ngInject */
    function config ($stateProvider) {
        $stateProvider.state('app.countries.show', {
            url: '/:id',
            templateUrl: 'templates/states/countries/show/show.html',
            controller: 'ShowController',
            controllerAs: 'vm',
            resolve: {
                country: resolveCountry
            }
        });
    }

    /* @ngInject */
    function resolveCountry ($stateParams, Country) {
        return Country.getByAlpha($stateParams.id);
    }
})();
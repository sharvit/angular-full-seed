(function() {
    'use strict';

    angular
        .module('app.states.countries.show-country')

        .config(config)
    ;

    /* @ngInject */
    function config ($stateProvider) {
        $stateProvider.state('app.countries.show-country', {
            url: '/:id',
            templateUrl: 'templates/states/countries/show-country/show-country.html',
            controller: 'ShowCountryController',
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
(function() {
    'use strict';

    angular
        .module('app.states.countries.countries-list')

        .config(config)
    ;

    /* @ngInject */
    function config ($stateProvider) {
        $stateProvider.state('app.countries.countries-list', {
            url: '/list',
            templateUrl: 'templates/states/countries/countries-list/countries-list.html',
            controller: 'CountriesListController',
            controllerAs: 'vm',
            resolve: {
                countries: resolveCountries
            }
        });
    }

    /* @ngInject */
    function resolveCountries (Country) {
        return Country.all();
    }
})();
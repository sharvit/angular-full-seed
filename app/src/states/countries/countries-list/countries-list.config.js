(function() {
    'use strict';

    angular
        .module('app.states.countries.countries-list')

        .config(config)
    ;

    /* @ngInject */
    function config ($stateProvider) {

        var countriesListTemplate = 'templates/states/countries/countries-list/countries-list.html';
        var countriesListController = 'CountriesListController';

        $stateProvider
            .state('app.countries.all', {
                url: '/all',
                templateUrl: countriesListTemplate,
                controller: countriesListController,
                controllerAs: 'vm',
                resolve: {
                    countries: resolveAllCountries
                }
            })
            .state('app.countries.by-region', {
                url: '/region/:region',
                templateUrl: countriesListTemplate,
                controller: countriesListController,
                controllerAs: 'vm',
                resolve: {
                    countries: resolveCountriesByRegion
                }
            })
            .state('app.countries.by-sub-region', {
                url: '/sub-region/:subRegion',
                templateUrl: countriesListTemplate,
                controller: countriesListController,
                controllerAs: 'vm',
                resolve: {
                    countries: resolveCountriesBySubRegion
                }
            })
            .state('app.countries.by-lang', {
                url: '/lang/:lang',
                templateUrl: countriesListTemplate,
                controller: countriesListController,
                controllerAs: 'vm',
                resolve: {
                    countries: resolveCountriesByLang
                }
            })
            .state('app.countries.by-currency', {
                url: '/currency/:currency',
                templateUrl: countriesListTemplate,
                controller: countriesListController,
                controllerAs: 'vm',
                resolve: {
                    countries: resolveCountriesByCurrency
                }
            })
        ;
    }

    /* @ngInject */
    function resolveAllCountries (Country) {
        return Country.all();
    }

    /* @ngInject */
    function resolveCountriesByRegion ($stateParams, Country) {
        return Country.allByRegion($stateParams.region);
    }

    /* @ngInject */
    function resolveCountriesBySubRegion ($stateParams, Country) {
        return Country.allBySubRegion($stateParams.subRegion);
    }

    /* @ngInject */
    function resolveCountriesByLang ($stateParams, Country) {
        return Country.allByLang($stateParams.lang);
    }

    /* @ngInject */
    function resolveCountriesByCurrency ($stateParams, Country) {
        return Country.allByCurrency($stateParams.currency);
    }
})();
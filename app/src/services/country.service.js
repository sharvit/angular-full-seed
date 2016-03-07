(function() {
    'use strict';

    angular
        .module('app.services')
        
        .factory('Country', Country)
    ;


    /* @ngInject */
    function Country ($http, COUNTRIES_API_URL) {
        var service = {
            all: all,
            allByRegion: allByRegion,
            allBySubRegion: allBySubRegion,
            allByLang: allByLang,
            allByCurrency: allByCurrency,
            getByAlpha: getByAlpha
        };
        
        return service;

        ////////////////

        function all () {
            return $http
                .get(COUNTRIES_API_URL + '/all')
                .then(countryResponseSucceed)
            ;
        }

        function allByCurrency (currency) {
            return $http
                .get(COUNTRIES_API_URL + '/currency/' + currency)
                .then(countryResponseSucceed)
            ;
        }

        function allByRegion (region) {
            return $http
                .get(COUNTRIES_API_URL + '/region/' + region)
                .then(countryResponseSucceed)
            ;
        }

        function allBySubRegion (subRegion) {
            return $http
                .get(COUNTRIES_API_URL + 'subregion/' + subRegion)
                .then(countryResponseSucceed)
            ;
        }

        function allByLang (lang) {
            return $http
                .get(COUNTRIES_API_URL + '/lang/' + lang)
                .then(countryResponseSucceed)
            ;
        }

        function getByAlpha (alpha) {
            return $http
                .get(COUNTRIES_API_URL + '/alpha/' + alpha)
                .then(countryResponseSucceed)
            ;
        }

        function countryResponseSucceed (response) {
            return response.data;
        }
    }
})();
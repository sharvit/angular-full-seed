(function() {
    'use strict';

    angular
        .module('app.services')
        
        .factory('Country', Country)
    ;


    /* @ngInject */
    function Country ($http) {
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
                .get('https://restcountries.eu/rest/v1/all')
                .then(countryResponseSucceed)
            ;
        }

        function allByCurrency (currency) {
            return $http
                .get('https://restcountries.eu/rest/v1/currency/' + currency)
                .then(countryResponseSucceed)
            ;
        }

        function allByRegion (region) {
            return $http
                .get('https://restcountries.eu/rest/v1/region/' + region)
                .then(countryResponseSucceed)
            ;
        }

        function allBySubRegion (subRegion) {
            return $http
                .get('https://restcountries.eu/rest/v1/subregion/' + subRegion)
                .then(countryResponseSucceed)
            ;
        }

        function allByLang (lang) {
            return $http
                .get('https://restcountries.eu/rest/v1/lang/' + lang)
                .then(countryResponseSucceed)
            ;
        }

        function getByAlpha (alpha) {
            return $http
                .get('https://restcountries.eu/rest/v1/alpha/' + alpha)
                .then(countryResponseSucceed)
            ;
        }

        function countryResponseSucceed (response) {
            return response.data;
        }
    }



// RANDOM WIKI: https://he.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&format=json
})();
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
})();
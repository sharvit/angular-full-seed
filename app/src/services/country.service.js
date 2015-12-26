(function() {
    'use strict';

    angular
        .module('app.services')
        
        .factory('Country', Country)
    ;


    /* @ngInject */
    function Country ($http) {
        var service = {
            all: all
        };
        
        return service;

        ////////////////

        function all () {
            return $http
                .get('https://restcountries.eu/rest/v1/all')
                .then(getAllSuccess)
            ;

            function getAllSuccess (response) {
                return response.data;
            }
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app.states.countries.countries-list')

        .controller('CountriesListController', CountriesListController)
    ;

    /* @ngInject */
    function CountriesListController ($state, countries) {
        var vm = this;
        vm.countries = countries;

        ////////////////
    }

})();
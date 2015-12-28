(function() {
    'use strict';

    angular
        .module('app.states.countries.show-country')

        .controller('ShowCountryController', ShowCountryController)
    ;

    /* @ngInject */
    function ShowCountryController ($state, country) {
        var vm = this;
        vm.country = country;

        ////////////////
    }

})();
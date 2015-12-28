(function() {
    'use strict';

    angular
        .module('app.states.countries.countries-list')

        .controller('ListController', ListController)
    ;

    /* @ngInject */
    function ListController ($state, countries) {
        var vm = this;
        vm.countries = countries;

        ////////////////
    }

})();
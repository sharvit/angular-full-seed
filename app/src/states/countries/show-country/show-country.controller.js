(function() {
    'use strict';

    angular
        .module('app.states.countries.show-country')

        .controller('ShowController', ShowController)
    ;

    /* @ngInject */
    function ShowController ($state, country) {
        var vm = this;
        vm.country = country;

        ////////////////
    }

})();
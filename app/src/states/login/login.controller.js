(function() {
    'use strict';

    angular
        .module('app.states.login')

        .controller('LoginController', LoginController)
    ;

    /* @ngInject */
    function LoginController ($state, DASHBOARD_PASSWORD) {
        var vm = this;
        vm.desiredPassword = DASHBOARD_PASSWORD;
        vm.invalidPassword = false;
        vm.password = '';

        vm.login = login;

        ////////////////

        function login () {
            if (vm.password === vm.desiredPassword) {
                $state.go('app.dashboard.state1');
            } else {
                vm.invalidPassword = true;
            }
        }
    }

})();
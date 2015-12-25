(function() {
    'use strict';

    angular
        .module('app.states.login')

        .controller('LoginController', LoginController)
    ;

    /* @ngInject */
    function LoginController ($state, dashboardPassword) {
        var vm = this;
        vm.desiredPassword = dashboardPassword;
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
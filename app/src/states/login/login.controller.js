(function() {
    'use strict';

    angular
        .module('app.states.login')

        .controller('LoginController', LoginController)
    ;

    /* @ngInject */
    function LoginController ($state, APP_CONFIG) {
        var vm = this;
        vm.desiredPassword = APP_CONFIG.dashboardPassword;
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
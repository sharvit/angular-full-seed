(function() {
  'use strict';

  angular
    .module('app.states.login')

    .controller('LoginController', LoginController)

  ;

  /* @ngInject */
  function LoginController ($state) {
    var vm = this;
    vm.invalidPassword = false;
    vm.password = '';

    vm.login = login;

    ////////////////

    function login () {
      if (vm.password === '121212') {
        $state.go('dashboard.state1');
      } else {
        vm.invalidPassword = true;
      }
    }
  }

})();
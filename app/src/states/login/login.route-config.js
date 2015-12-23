(function() {
  'use strict';

  angular
    .module('app.states.login')

    .config(config)

  ;

  /* @ngInject */
  function config ($stateProvider) {
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'templates/states/login/login.html',
      controller: 'LoginController',
      controllerAs: 'vm'
    });
  }

})();
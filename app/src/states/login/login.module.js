(function() {
  'use strict';

  angular
    .module('app.states.login', [
      'ui.router'
    ])

    .config(config)

    .controller('LoginCtrl', LoginCtrl)

  ;

  function config ($stateProvider) {
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'templates/states/login/login.html',
      controller: 'LoginCtrl'
    });
  }

  function LoginCtrl () {

  }
})();
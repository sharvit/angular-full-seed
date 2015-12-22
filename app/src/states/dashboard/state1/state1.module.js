(function() {
  'use strict';

  angular
    .module('app.states.dashboard.state1', [
      'ui.router'
    ])

    .config(config)

    .controller('State1Ctrl', State1Ctrl)

  ;

  /* @ngInject */
  function config ($stateProvider) {
    $stateProvider.state('dashboard.state1', {
      url: '/state1',
      templateUrl: 'templates/states/dashboard/state1/state1.html',
      controller: 'State1Ctrl'
    });
  }

  function State1Ctrl () {

  }

})();
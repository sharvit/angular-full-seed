(function() {
  'use strict';

  angular
    .module('app.states.dashboard.state1', [
      'ui.router'
    ])

    .config(config)

  ;

  /* @ngInject */
  function config ($stateProvider) {
    $stateProvider.state('dashboard.state1', {
      url: '/state1',
      templateUrl: 'templates/states/dashboard/state1/state1.html'
    });
  }

})();
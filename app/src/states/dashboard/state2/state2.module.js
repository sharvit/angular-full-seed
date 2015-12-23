(function() {
  'use strict';

  angular
    .module('app.states.dashboard.state2', [
      'ui.router'
    ])

    .config(config)

  ;

  /* @ngInject */
  function config ($stateProvider) {
    $stateProvider.state('dashboard.state2', {
      url: '/state2',
      templateUrl: 'templates/states/dashboard/state2/state2.html'
    });
  }

})();
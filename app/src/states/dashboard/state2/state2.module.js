(function() {
  'use strict';

  angular
    .module('app.states.dashboard.state2', [
      'ui.router'
    ])

    .config(config)

    .controller('State2Ctrl', State2Ctrl)

  ;

  function config ($stateProvider) {
    $stateProvider.state('dashboard.state2', {
      url: '/state2',
      templateUrl: 'templates/states/dashboard/state2/state2.html',
      controller: 'State2Ctrl'
    });
  }

  function State2Ctrl () {

  }

})();
(function() {
  'use strict';

  angular
    .module('app.views.view1', [
      'ngRoute'
    ])

    .config(config)

    .controller('View1Ctrl', View1Ctrl)

  ;

  config.$inject = ['$routeProvider'];

  function config ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'templates/views/view1/view1.html',
      controller: 'View1Ctrl'
    });
  }

  function View1Ctrl () {

  }

})();
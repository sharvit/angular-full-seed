(function() {
  'use strict';

  angular
    .module('app.views.view2', [
      'ngRoute'
    ])

    .config(config)

    .controller('View2Ctrl', View2Ctrl)

  ;

  config.$inject = ['$routeProvider'];

  function config ($routeProvider) {
    $routeProvider.when('/view2', {
      templateUrl: 'templates/views/view2/view2.html',
      controller: 'View2Ctrl'
    });
  }

  function View2Ctrl () {

  }

})();
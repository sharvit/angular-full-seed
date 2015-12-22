(function() {
	'use strict';

	angular
		.module('app.core')
		.config(router)
	;

  /* @ngInject */
	function router ($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/login');

		$locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
	}
})();
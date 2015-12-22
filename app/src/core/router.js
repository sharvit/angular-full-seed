(function() {
	'use strict';

	angular
		.module('app.core')
		.config(router)
	;

	function router ($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/login');

		$locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
	}
})();
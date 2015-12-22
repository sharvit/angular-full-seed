(function() {
	'use strict';

	angular
		.module('app.core')
		.config(router)
	;

	function router ($routeProvider, $locationProvider) {
		$routeProvider.otherwise({
			redirectTo: '/view1'
		});

		$locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
	}
})();
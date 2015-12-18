(function() {
	'use strict';

	angular
		.module('app.core')
		.config(router)
	;

	router.$inject = ['$routeProvider'];

	function router ($routeProvider) {
		$routeProvider.otherwise({
			redirectTo: '/view1'
		});
	}
})();
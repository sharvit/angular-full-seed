(function () {
	'use strict';

	angular
		.module('app.core', [
			'ui.router',
			'ui.bootstrap',

			'ngAnimate',
			'ngAnimate-animate.css',

			'ngCookies',
			'pascalprecht.translate',

			'app.core.config'
		])
		
	;


	require('./core.config.js');
	require('./core.translations.config.js');
})();
(function () {
	'use strict';

	angular
		.module('app.core', [
			'ui.router',
			'ui.bootstrap',

			'ngAnimate',
			'ngAnimate-animate.css',
			'angular-loading-bar',

			'ngCookies',
			'pascalprecht.translate',

			// 'language-picker',
			'ui.bootstrap.locale-dialog',

			'app.core.config'
		])
		
	;


	require('./core.config.js');
	require('./core.translations.config.js');
})();
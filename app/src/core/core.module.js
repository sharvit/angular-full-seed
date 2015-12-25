(function () {
	'use strict';

	angular
		.module('app.core', [
			'ngCookies',
			'ui.router',
			'pascalprecht.translate',

			'app.core.config'
		])
		
	;


	require('./core.config.js');
	require('./core.translations.config.js');
})();
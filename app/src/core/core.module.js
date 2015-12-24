(function () {
	'use strict';

	angular
		.module('app.core', [
			'ngCookies',
			'ui.router',
			'pascalprecht.translate'
		])
		
	;


	require('./core.constants.js');
	require('./core.config.js');
	require('./core.translations.config.js');
})();
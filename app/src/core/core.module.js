(function () {
	'use strict';

	angular
		.module('app.core', [
			'ui.router'
		])
		
	;


	require('./constants.js');
	require('./config.js');
	require('./run.js');
	require('./router.js');
})();
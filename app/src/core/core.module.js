(function () {
	'use strict';

	angular
		.module('app.core', [
			'ngRoute'
		])
		
	;


	require('./constants.js');
	require('./config.js');
	require('./run.js');
	require('./router.js');
})();
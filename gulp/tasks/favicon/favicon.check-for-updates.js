(function() {

	'use strict';

	var Settings      = require('../../settings.js');

	// dependencies 
	var gulp          = require('gulp');
	var plugins       = require('gulp-load-plugins')();
	var fs 			  = require('fs');

	/**
	* check for updates at the favicons web service
	*/
	gulp.task('favicon:check-for-updates', function(done) {
		var currentVersion = JSON.parse(fs.readFileSync(Settings.config.configFiles.favicons.build)).version;

		plugins.realFavicon.checkForUpdates(currentVersion, function(err) {
			if (err) {
				throw err;
			} else {
				done();
			}
		});
	}).help = {
		'': 'check for updates at the favicons web service'
	};

})();
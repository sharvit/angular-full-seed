(function() {

	'use strict';

	var Settings      = require('../../settings.js');
	var errorHandler  = require('../../errorHandler.js');

	// dependencies 
	var gulp          = require('gulp');
	var plugins       = require('gulp-load-plugins')();

	/**
	* generate favicons
	*/
	gulp.task('favicon:generate', function(done) {
		plugins.realFavicon.generateFavicon(Settings.faviconGenerateConfig, done);
	}).help = {
		'': 'generate favicons'
	};

})();
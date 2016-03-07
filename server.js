(function() {

	'use strict';

	// use new relic if license key exists
	if (typeof process.env.NEW_RELIC_LICENSE_KEY === 'string') {
		require('newrelic');
	}

	var express   = require('express'),
		path      = require('path'),
		compress  = require('compression'),

		PORT          = process.env.PORT || 3000,

		RELEASE_PATH  = path.resolve(__dirname,       'build/release' ),
		INDEX_FILE    = path.resolve(RELEASE_PATH,    'index.html'    ),

		STATIC_URLS = [
			'/fonts/',
			'/icons/',
			'/images/',
			'/locales/',
			'/scripts/',
			'/styles/',
			'/favicons/'
		],

		server = express()
	;

	// use gzip compress 
	server.use(compress());

	// Cache the static urls
	server.use(function(req, res, next) {
		for (var i = 0; i < STATIC_URLS.length; i++) {
			if (req.url.indexOf(STATIC_URLS[i]) === 0) {
				res.setHeader('Cache-Control', 'public, max-age=345600'); // 4 days
				res.setHeader('Expires', new Date(Date.now() + 345600000).toUTCString());
			}
		}

		return next();
	});


	// user express to serve the static release files
	server.use(express.static(RELEASE_PATH));

	// html5mode
	server.get('/*', function(req, res, next) {

		// Do not serve the index for static urls
		for (var i = 0; i < STATIC_URLS.length; i++) {
			if (req.url.indexOf(STATIC_URLS[i]) === 0) {
				return next();
			}
		}

		// Use res.sendFile, as it streams instead of reading the file into memory.
		res.sendFile(INDEX_FILE);
	});

	// run the server and start listen to the port
	server.listen(PORT);

	// Render some console log output
	console.log('Angular app is running on port ' + PORT);
})();
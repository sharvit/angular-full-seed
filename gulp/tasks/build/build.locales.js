(function() {

    'use strict';

    var Settings      = require('../../settings.js');
    var errorHandler  = require('../../errorHandler.js');

    // dependencies 
    var gulp          = require('gulp');
    var path          = require('path');
    var streamqueue   = require('streamqueue');
    var plugins       = require('gulp-load-plugins')();

    /**
    * build each avilable locale (from config.json) to his own json fle (en.json)
    */
    gulp.task('build:locales', function () {

        return buildLocalesQueue()
            .pipe(gulp.dest(path.resolve(Settings.targetDir, 'locales')))
            .on('error', errorHandler)
        ;
    }).help = {
        '': 'build each avilable locale (from config.json) to his own json fle (en.json)',
        '[ --release ] [ -r ]': 'release mode'
    };

    // build each avilable locale
    function buildLocalesQueue () {
        // Prepare the stream queue
        var localesQueue = streamqueue({ objectMode: true });

        // Load the avilable locales from the config
        var avilableLocales = Settings.appConfig['I18N_CONFIG'].avilableLocales;

        // For each avilable locales
        for (var i = 0; i < avilableLocales.length; i++) {
            // Build the local and add to the stream queue
            localesQueue.queue(
                buildLocale(avilableLocales[i])
            );
        }

        return localesQueue.done();
    }

    // Combine all the locale files to one locale file
    function buildLocale (locale) {
        var localePattern = Settings.config.patterns.localeReplace.replace(/{{locale}}/g, locale);

        return gulp.src(localePattern)
            .pipe(plugins.extend(locale + '.json'))
        ;
    }
})();
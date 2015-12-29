(function() {

    'use strict';

    var Settings      = require('../../settings.js');

    // dependencies 
    var gulp          = require('gulp');

    // devDependencies 
    var protractorQA;

    // It is posibble to load devDependencies only in development mode
    if (Settings.isDevelopmentMode()) {
        protractorQA  = require('gulp-protractor-qa');
    }

    /**
    * run rotractor-qa watchers to notify when protactor element locating is gone
    */
    gulp.task('watch:protractor-qa', function() {
        protractorQA.init({
            testSrc: './e2e-tests/*.spec.js',
            viewSrc: [
                Settings.config.files.index,
                'app/src/**/*.html'
            ]
        });
    }).help = {
        '': 'run rotractor-qa watchers to notify when protactor element locating is gone',
        '[ --release ] [ -r ]': 'release mode'
    };

})();
(function() {

    'use strict';

    var Settings      = require('../../settings.js');
    var errorHandler  = require('../../errorHandler.js');

    // dependencies 
    var gulp          = require('gulp');
    var gulpi18nCsv   = require('gulp-i18n-csv');
    var path          = require('path');

    /**
    * build locales files from the locales.csv
    */
    gulp.task('build:locales', function () {

        return gulp.src(Settings['LOCALES_PATH'])
            .pipe(gulpi18nCsv({
                resPath: '__lng__.json',
                split: false
            }))
            .pipe(gulp.dest(path.join(Settings['TARGET_DIR'], 'locales')))
            .on('error', errorHandler)
        ;
    }).help = {
        '': 'build locales files (just copy them to target destination)',
        '[ --release ] [ -r ]': 'release mode'
    };
})();
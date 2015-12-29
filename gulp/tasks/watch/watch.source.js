(function() {

    'use strict';

    var Settings      = require('../../settings.js');

    // dependencies 
    var gulp          = require('gulp');

    /**
    * run watchers to auto build source files
    */
    gulp.task('watch:source', function() {
        gulp.watch(Settings['PATTERNS']['LOCALES'],     ['build:locales']);
        gulp.watch(Settings['PATTERNS']['STYLES'],      ['build:styles']);
        gulp.watch(Settings['PATTERNS']['FONTS'],       ['build:fonts']);
        gulp.watch(Settings['PATTERNS']['ICONS'],       ['build:icons']);
        gulp.watch(Settings['PATTERNS']['IMAGES'],      ['build:images']);
        gulp.watch(Settings['PATTERNS']['TEMPLATES'],   ['build:templates', 'build:scripts']);
        gulp.watch(Settings['PATTERNS']['JS'],          ['build:scripts']);


        gulp.watch(Settings['VENDOR_PATH'],     ['build:vendor']);
        gulp.watch(Settings['INDEX_PATH'],      ['build:index']);
    }).help = {
        '': 'run watchers to auto build source files',
        '[ --release ] [ -r ]': 'release mode'
    };

})();
(function() {

    'use strict';

    var Settings      = require('../../settings.js');
    var errorHandler  = require('../../errorHandler.js');

    // dependencies 
    var gulp          = require('gulp');
    var path          = require('path');
    var streamqueue   = require('streamqueue');

    /**
    * build icons (just copy them to target destination)
    **/
    gulp.task('build:icons', function() {

        var appFontsStream = gulp
            .src(Settings.config.patterns.icons)
        ;

        var vendorFontsStream = gulp
            .src(Settings.vendorFiles.icons)
        ;

        return streamqueue({ objectMode: true }, appFontsStream, vendorFontsStream)

            .pipe(gulp.dest(path.join(Settings.targetDir, 'icons')))

            .on('error', errorHandler)
        ;
    }).help = {
        '': 'build icons (just copy them to target destination)',
        '[ --release ] [ -r ]': 'release mode'
    };
})();
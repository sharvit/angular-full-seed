(function() {

    'use strict';

    var Settings      = require('../../settings.js');
    var errorHandler  = require('../../errorHandler.js');

    // dependencies 
    var gulp          = require('gulp');
    var path          = require('path');
    var streamqueue   = require('streamqueue');

    /**
    * build fonts (just copy them to target destination)
    **/
    gulp.task('build:fonts', function() {

        var appFontsStream = gulp
            .src(Settings.config.patterns.fonts)
        ;

        var vendorFontsStream = gulp
            .src(Settings.vendorFiles.fonts)
        ;

        return streamqueue({ objectMode: true }, appFontsStream, vendorFontsStream)

            .pipe(gulp.dest(path.join(Settings.targetDir, 'fonts')))

            .on('error', errorHandler)
        ;
    }).help = {
        '': 'build fonts (just copy them to target destination)',
        '[ --release ] [ -r ]': 'release mode'
    };
})();
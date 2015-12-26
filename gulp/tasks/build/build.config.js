(function() {

    'use strict';

    var Settings      = require('../../settings.js');
    var errorHandler  = require('../../errorHandler.js');

    // dependencies 
    var gulp          = require('gulp');
    var ngConstant    = require('gulp-ng-constant');


    /**
    * build config.json into app.core constants
    */
    gulp.task('build:config', function() {

        return ngConstant({
                name: 'app.core.config',
                constants: Settings['CONFIGURATION'],
                stream: true
            })
            .pipe(gulp.dest(Settings['TEMP_TARGET_DIR']))
            .on('error', errorHandler)
        ;
    }).help = {
        '': 'build config.json into app.core constants',
        '[ --release ] [ -r ]': 'release mode'
    };
})();
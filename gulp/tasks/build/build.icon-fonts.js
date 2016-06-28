(function() {

    'use strict';

    var Settings      = require('../../settings.js');
    var errorHandler  = require('../../errorHandler.js');

    // dependencies 
    var gulp          = require('gulp');
    var path          = require('path');
    var plugins       = require('gulp-load-plugins')();


    /**
    * build svg-sprite from svg files
    */
    gulp.task('build:icon-fonts', function() {
        
        var fontName = 'yumday-icons-fonts';

        // Settings.config.targetDir.tempTargetDir

        return gulp.src(Settings.config.patterns.iconFonts)
            .pipe(plugins.iconfontCss({
                fontName: fontName,
                path: 'scss',
                targetPath: '../scss/_' + fontName + '.scss',
                fontPath: '../fonts/'
            }))
            .pipe(plugins.iconfont({
                fontName: fontName,
                formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'], // default, 'woff2' and 'svg' are available
                timestamp: Math.round(Date.now()/1000), // recommended to get consistent builds when watching files
            }))
            .pipe(gulp.dest(path.join(Settings.config.targetDir.tempTargetDir, 'fonts')))
        ;

    }).help = {
        '': 'build config.json into app.core constants',
        '[ --release ] [ -r ]': 'release mode'
    };
})();
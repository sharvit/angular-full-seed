(function() {

    'use strict';

    var Settings      = require('../../settings.js');

    // dependencies 
    var gulp          = require('gulp');

    /**
    * run watchers to auto build source files
    */
    gulp.task('watch:source', function() {
        gulp.watch(Settings.config.patterns.locales,                 ['build:locales']);
        gulp.watch(Settings.config.patterns.styles,                  ['build:styles']);
        gulp.watch(Settings.config.patterns.fonts,                   ['build:fonts']);
        gulp.watch(Settings.config.patterns.icons,                   ['build:icons']);
        gulp.watch(Settings.config.patterns.images,                  ['build:images']);
        gulp.watch(Settings.config.patterns.templates,               ['build:templates', 'build:scripts']);
        gulp.watch(Settings.config.patterns.js,                      ['build:scripts']);
        gulp.watch(Settings.config.patterns.config,                  ['settings:reload-app-config', 'build:config']);
        gulp.watch(Settings.config.patterns.environmentsConfig,      ['settings:reload-app-config', 'build:config']);



        gulp.watch(Settings.config.configFiles.vendor,      ['settings:reload-vendor-files', 'build:vendor']);
        gulp.watch(Settings.config.files.index,             ['build:index']);
    }).help = {
        '': 'run watchers to auto build source files',
        '[ --release ] [ -r ]': 'release mode'
    };

})();
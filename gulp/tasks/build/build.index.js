(function() {

  'use strict';

  var Settings      = require('../../settings.js');
  var errorHandler  = require('../../errorHandler.js');

  // dependencies 
  var gulp          = require('gulp');
  var plugins       = require('gulp-load-plugins')();
  var fs            = require('fs');
  
  /**
   * inject .js and .css files into index.html
   */
  gulp.task('build:index', function() {

    // build has a '-versionnumber' suffix
    var cssNaming = 'styles/app*';

    // injects 'src' into index.html at position 'tag'
    var _inject = function(src, tag) {
      return plugins.inject(src, {
        starttag: '<!-- inject:' + tag + ':{{ext}} -->',
        addRootSlash: false
      });
    };

    return gulp.src(Settings.config.files.index)

      // inject css
      .pipe(
        _inject(gulp.src(cssNaming, { cwd: Settings.targetDir }), 'app-styles')
      )

      // inject app.js and vendor.js (release) or all js files indivually (debug)
      .pipe(
        _inject(gulp.src(['scripts/vendor/*.js', 'scripts/app/*.js'], { cwd: Settings.targetDir }), 'app-scripts')
      )

      // inject favicons
      .pipe(
        plugins.realFavicon
          .injectFaviconMarkups(
            JSON.parse(
              fs.readFileSync(
                Settings.config.configFiles.favicons.build
              )
            )
            .favicon
            .html_code
          )
      )

      .pipe(gulp.dest(Settings.targetDir))
      .on('error', errorHandler);
  }).help = {
    '': 'inject .js and .css files into index.html',
    '[ --release ] [ -r ]': 'release mode'
  };

})();
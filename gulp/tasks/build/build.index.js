(function() {

  'use strict';

  var Settings      = require('../../settings.js');
  var errorHandler  = require('../../errorHandler.js');

  // dependencies 
  var gulp          = require('gulp');
  var plugins       = require('gulp-load-plugins')();
  
  /**
   * bundle all the src files into scripts/bundle.js
   */
  gulp.task('build:index', function() {

    // build has a '-versionnumber' suffix
    var cssNaming = 'styles/main*';

    // injects 'src' into index.html at position 'tag'
    var _inject = function(src, tag) {
      return plugins.inject(src, {
        starttag: '<!-- inject:' + tag + ':{{ext}} -->',
        read: false,
        addRootSlash: false
      });
    };

    return gulp.src('app/index.html')
      // inject css
      .pipe(_inject(gulp.src(cssNaming, { cwd: Settings['TARGET_DIR'] }), 'app-styles'))
      // inject app.js and vendor.js (release) or all js files indivually (debug)
      .pipe(
        _inject(gulp.src(['scripts/vendor/*.js', 'scripts/app/*.js'], { cwd: Settings['TARGET_DIR'] }), 'app-scripts')
      )

      .pipe(gulp.dest(Settings['TARGET_DIR']))
      .on('error', errorHandler);
  }).help = {
    '': 'inject the files in index.html',
    '[ --release ] [ -r ]': 'release mode'
  };

})();
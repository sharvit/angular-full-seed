'use strict';

/**
 * Settings
 */
var appName = 'app';
var tempTragetDir    = './build/.tmp';
var debugTargetDir   = './build/debug';
var releaseTargetDir = './build/release';
var DEFAULT_PORT = 8888;


// Load .env file if exists
// Require all vars from .env.example to be exist in env.proccess
// otherwise it will throw errors!
// For development/test we want to load env vars from .env file
// For production we dont want .env file, we want the server env system
require('dotenv-safe').load();


// All dependencies will be loaded to this vars base on NODE_ENV
var
  gulp,
  ghelp,
  plugins,
  del,
  beep,
  path,
  streamqueue,
  runSequence,
  browserify,
  source,
  buffer,
  uglify,
  sourcemaps,
  stylish,
  gulpWebserver,
  karmaServer,
  angularProtractor
;

// Load all the production dependencies base on NODE_ENV
function loadDependencies () {

  // Load all the production dependencies
  function loadProductionDependencies () {
    gulp           = require('gulp');
    ghelp          = require('gulp-showhelp');
    plugins        = require('gulp-load-plugins')();
    del            = require('del');
    beep           = require('beepbeep');
    path           = require('path');
    streamqueue    = require('streamqueue');
    runSequence    = require('run-sequence');
    browserify     = require('browserify');
    source         = require('vinyl-source-stream');
    buffer         = require('vinyl-buffer');
    uglify         = require('gulp-uglify');
    sourcemaps     = require('gulp-sourcemaps');
  }

  // Load all the development dependencies
  // Development dependencies should contain all production dependencies
  function loadDevelopmentDependencies () {
    // Development dependencies should contain all production dependencies
    loadProductionDependencies();

    // Load the development dependencies
    stylish             = require('jshint-stylish');
    gulpWebserver       = require('gulp-webserver');
    karmaServer         = require('karma').Server;
    angularProtractor   = require('gulp-angular-protractor');
  }

  // Decide what dependencies to Load based on NODE_ENV
  switch (process.env['NODE_ENV']) {

    case 'production':
      loadProductionDependencies();
      break;

    case 'development':
    case 'test':
      loadDevelopmentDependencies();
      break;

    default:
      throw 'Your NODE_ENV (' + process.env['NODE_ENV'] + ') is not supported!\nPlease set a valid one:\n\tproduction\n\tdevelopment\n\ttest';

  }
}

loadDependencies();

/**
 * Parse arguments
 */
var args = require('yargs')
    .alias('r', 'release')
    .alias('p', 'port')
    .default('release', false)
    .default('port', DEFAULT_PORT)
    .argv;

var release, port, targetDir;

init();

function init () {
  release = !!args.release;
  port = args.port;
  decideAboutTragetDir();
}

function decideAboutTragetDir () {
  targetDir = path.resolve(release ? releaseTargetDir : debugTargetDir);
}

function getProtractorBinary(binaryName){
    var winExt = /^win/.test(process.platform)? '.cmd' : '';
    var pkgPath = require.resolve('protractor');
    var protractorDir = path.resolve(path.join(path.dirname(pkgPath), '..', 'bin'));
    return path.join(protractorDir, '/'+binaryName+winExt);
}

// global error handler
function errorHandler (error) {
  if (release) {
    throw error;
  } else {
    beep(2, 170);
    plugins.util.log(error);
  }
}


/**
 * Default Task
**/
gulp.task('default', ['help']);

/**
 * Help Tasks
 * Tasks to show when using 'gulp help'
**/
var helpTasks = [
  '',
  'help',
  '',
  '',
  'serve',
  '',
  'serve:runserver',
  '',
  '',
  'build',
  '',
  'build:clean-target',
  'build:locales',
  'build:favicon',
  'build:fonts',
  'build:templates',
  'build:styles',
  'build:images',
  'build:vendor',
  'build:scripts',
  'build:scripts:bundle',
  'build:index',
  '',
  '',
  'watch',
  '',
  'watch:source',
  'watch:target',
  '',
  '',
  'test',
  '',
  'test:unit',
  'test:unit:run-karma-server',
  '',
  'test:e2e',
  'test:e2e:run-protractor-server',
  '',
  '',
  'clean',
  '',
  'clean:all',
  'clean:debug',
  'clean:release',
  '',
  '',
  'lint'
];
gulp.task('help', function() {
  var task = ghelp.getArgv('task', 't');
  if (task !== null) {
    ghelp.show(task);
  } else {
    ghelp.show(helpTasks);
  }
}).help = {
  '': 'shows this help message.',
  '[ --task=t ] [ -t=t ]': 'specifys a task shown.'
};




/**
 * Lint Tasks
 * lint js sources based on .jshintrc ruleset
 */
gulp.task('lint', function() {
  return gulp
    .src('app/src/**/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(stylish))
    .on('error', errorHandler);
}).help = {
  '': 'lint js sources based on .jshintrc ruleset.'
};

/**
 * Clean Tasks
 */
gulp.task('clean', ['clean:all']).help = {
  '': 'default clean task, clean all target directories.',
  'Run': '[ clean:all ]'
};
gulp.task('clean:all', ['clean:debug', 'clean:release']).help = {
  '': 'clean all target directories.',
  'Run': '[ clean:debug clean:release ]'
};
gulp.task('clean:debug', ['clean:tempfiles'], function(done) {
  del(releaseTargetDir).then(function () {
    done();
  });
}).help = {
  '': 'clean debug target directory.'
};
gulp.task('clean:release', ['clean:tempfiles'], function(done) {
  del(debugTargetDir).then(function () {
    done();
  });
}).help = {
  '': 'clean release target directory.'
};
gulp.task('clean:tempfiles', function(done) {
  del(tempTragetDir).then(function () {
    done();
  });
}).help = {
  '': 'clean the temporary directory.'
};


/**
 * Build Tasks
 */
gulp.task('build', function(done) {
  runSequence(
    'clean:tempfiles',
    'build:clean-target',
    [
      release ? 'private:noop' : 'lint',
      'build:locales',
      'build:favicon',
      'build:fonts',
      'build:templates',
      'build:styles',
      'build:images',
      'build:vendor'
    ],
    'build:scripts',
    'build:index',
    'clean:tempfiles',
    done
  );
}).help = {
  '': 'start run the build proccess',
  '[ --release ] [ -r ]': 'release mode',
  'Run': [
    '',
    'clean:tempfiles',
    'build:clean-target',
    [
      '[',
      'lint if release?',
      'build:locales',
      'build:favicon',
      'build:fonts',
      'build:templates',
      'build:styles',
      'build:images',
      'build:vendor'
    ].join('\n\t\t'),
    ']',
    'build:scripts',
    'build:index',
    'clean:tempfiles'
  ].join('\n\t')
};
// clean target directory by --release flag
gulp.task('build:clean-target', function(done) {
  del(targetDir).then(function () {
    done();
  });
}).help = {
  '': 'clean target directory',
  '[ --release ] [ -r ]': 'release mode'
};
// build locals files (just copy them to target destination)
gulp.task('build:locales', function () {
  return gulp.src('app/locales/**/*.json')
    .pipe(gulp.dest(path.join(targetDir, 'locales')))

    .on('error', errorHandler);
}).help = {
  '': 'build locals files (just copy them to target destination)',
  '[ --release ] [ -r ]': 'release mode'
};
// build fivicon, copy from root app to root dest
gulp.task('build:favicon', function() {
  return gulp
    .src(['app/*.*ico'])

    .pipe(gulp.dest(targetDir))

    .on('error', errorHandler);
}).help = {
  '': 'build fivicon, copy from root app to root dest',
  '[ --release ] [ -r ]': 'release mode'
};
// build fonts (just copy them to target destination)
gulp.task('build:fonts', function() {
  return gulp
    .src(['app/fonts/*.*'])

    .pipe(gulp.dest(path.join(targetDir, 'fonts')))

    .on('error', errorHandler);
}).help = {
  '': 'build fonts (just copy them to target destination)',
  '[ --release ] [ -r ]': 'release mode'
};
// build templates (just copy them to target destination)
gulp.task('build:templates', function() {

  return gulp.src('app/src/**/*.html')
    .pipe(plugins.angularTemplatecache('templates.js', {
      root: 'templates/',
      module: appName,
      htmlmin: release
    }))
    .pipe(gulp.dest(tempTragetDir))
    .on('error', errorHandler);

}).help = {
  '': 'build templates (just copy them to target destination)',
  '[ --release ] [ -r ]': 'release mode'
};
// precompile .scss files
gulp.task('build:styles', function() {

  var options = release ? { style: 'compressed' } : { style: 'expanded' };

  var sassStream = gulp.src('app/styles/main.scss')
    .pipe(plugins.sass(options))
    .on('error', function(err) {
      console.log('err: ', err);
      beep();
    });

  return streamqueue({ objectMode: true }, sassStream)
    .pipe(plugins.autoprefixer())
    .pipe(plugins.concat('main.css'))
    .pipe(plugins.if(release, plugins.stripCssComments()))
    .pipe(plugins.if(release, plugins.rev()))
    .pipe(gulp.dest(path.join(targetDir, 'styles')))
    .on('error', errorHandler);
}).help = {
  '': 'precompile .scss files',
  '[ --release ] [ -r ]': 'release mode'
};
// build images (just copy them to target destination)
gulp.task('build:images', function() {
  return gulp.src('app/images/**/*.*')
    .pipe(gulp.dest(path.join(targetDir, 'images')))

    .on('error', errorHandler);
}).help = {
  '': 'build images (just copy them to target destination)',
  '[ --release ] [ -r ]': 'release mode'
};
// concatenate and minify vendor sources
gulp.task('build:vendor', function() {
  var vendorFiles = require('./vendor.json');
  var dest = path.join(targetDir, 'scripts/vendor');

  return gulp.src(vendorFiles)
    .pipe(plugins.concat('vendor.js'))
    .pipe(plugins.if(release, plugins.uglify()))
    .pipe(plugins.if(release, plugins.rev()))

    .pipe(gulp.dest(dest))

    .on('error', errorHandler);
}).help = {
  '': 'concatenate and minify vendor sources',
  '[ --release ] [ -r ]': 'release mode'
};
// build templatecache, copy scripts.
// if release: concat, minsafe, uglify and versionize
gulp.task('build:scripts', ['build:scripts:bundle'], function() {
  var dest = path.join(targetDir, 'scripts/app');

  var scriptStream = gulp
    .src( ['bundle.js', 'bundle.js.map', 'configuration.js', 'templates.js' ], { cwd: tempTragetDir })

    .pipe(plugins.changed(dest));

  return streamqueue({ objectMode: true }, scriptStream)
    .pipe(plugins.if(release, plugins.stripDebug()))
    .pipe(plugins.if(release, plugins.concat('app.js')))
    .pipe(plugins.if(release, plugins.uglify()))
    .pipe(plugins.if(release, plugins.rev()))

    .pipe(gulp.dest(dest))

    .on('error', errorHandler);
}).help = {
  '': 'copy scripts, build templatecache, build bundle.',
  '[ --release ] [ -r ]': 'release mode, concat, minsafe, uglify and versionize',
  'Run': '\n\tbuild:scripts:bundle'
};
// bundle all the src files into scripts/bundle.js
gulp.task('build:scripts:bundle', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './app/src/app.js',
    debug: !release
  });

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(plugins.ngAnnotate({'single_quotes': true}))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', plugins.util.log)
    .pipe(plugins.if(!release,sourcemaps.write('./')))
    .pipe(gulp.dest(tempTragetDir));
}).help = {
  '': 'bundle all the src files into scripts/bundle.js',
  '[ --release ] [ -r ]': 'release mode'
};
// inject the files in index.html
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
    .pipe(_inject(gulp.src(cssNaming, { cwd: targetDir }), 'app-styles'))
    // inject app.js and vendor.js (release) or all js files indivually (debug)
    .pipe(
      _inject(gulp.src(['scripts/vendor/*.js', 'scripts/app/*.js'], { cwd: targetDir }), 'app-scripts')
    )

    .pipe(gulp.dest(targetDir))
    .on('error', errorHandler);
}).help = {
  '': 'inject the files in index.html',
  '[ --release ] [ -r ]': 'release mode'
};


/**
 * Watchers Tasks
 */
gulp.task('watch', [
  'watch:source',
  'watch:target'
]).help = {
  '': 'run watchers to auto build source files and live reload browser',
  '[ --release ] [ -r ]': 'release mode',
  'Run': [
    '',
    'watch:source',
    'watch:target'
  ].join('\n\t')
};
gulp.task('watch:source', function() {
  gulp.watch('app/locales/**/*.json', ['build:locales']);
  gulp.watch('app/styles/**/*.scss', ['build:styles']);
  gulp.watch('app/fonts/**', ['build:fonts']);
  gulp.watch('app/images/**', ['build:images']);
  gulp.watch('./vendor.json', ['build:vendor']);
  gulp.watch('app/src/**/*.html', ['build:templates', 'build:scripts']);
  gulp.watch('app/src/**/*.js', ['build:scripts']);
  gulp.watch('app/index.html', ['build:index']);
}).help = {
  '': 'run watchers to auto build source files',
  '[ --release ] [ -r ]': 'release mode'
};
gulp.task('watch:target', function() {
  plugins.livereload.listen();
  gulp.watch(targetDir + '/**')
    .on('change', plugins.livereload.changed)
    .on('error', errorHandler);
}).help = {
  '': 'run live reload watchers on target directory',
  '[ --release ] [ -r ]': 'release mode'
};


/**
 * Serve Tasks
 */
gulp.task('serve', function(done) {
  runSequence(
    'build',
    'watch',
    'serve:runserver',
    done
  );
}).help = {
  '': 'build, watch, run development server and open the browser',
  '[ --release ] [ -r ]': 'release mode',
  '[ --port=PORT ] [ -p=PORT ]': 'set the web server port. default to ' + DEFAULT_PORT,
  'Run': [
    '',
    'build',
    'watch',
    'serve:runserver'
  ].join('\n\t')
};
gulp.task('serve:runserver', function() {
  gulp.src(targetDir)
    .pipe(gulpWebserver({
      path: '/',
      fallback: 'index.html',
      port: port,
      livereload: true,
      open: true
    }));
}).help = {
  '': 'run development server and open the browser',
  '[ --release ] [ -r ]': 'release mode',
  '[ --port=PORT ] [ -p=PORT ]': 'set the web server port. default to ' + DEFAULT_PORT
};

/**
 * Tests Tasks
 */
gulp.task('test', function(done) {
  runSequence(
    'test:unit',
    'test:e2e',
    done
  );
}).help = {
  '': 'build the app and run all tests (unit, e2e)',
  '[ --release ] [ -r ]': 'release mode',
  '[ --port=PORT ] [ -p=PORT ]': 'set the web server port. default to ' + DEFAULT_PORT,
  'Run': [
    '',
    'test:unit',
    'test:e2e'
  ].join('\n\t')
};
gulp.task('test:unit', function(done) {
  runSequence(
    'build',
    'test:unit:run-karma-server',
    done
  );
}).help = {
  '': 'build the app and run all unit tests',
  '[ --release ] [ -r ]': 'release mode',
  'Run': [
    '',
    'build',
    'test:unit:run-karma-server'
  ].join('\n\t')
};
gulp.task('test:unit:run-karma-server', function (done) {
  new karmaServer({
    configFile: __dirname + '/unit-tests.karma.conf.js',
    singleRun: true,
    basePath: targetDir,
    reporters: 'dots'
  }, done).start();
}).help = {
  '': 'run karma server and start run unit testing'
};
gulp.task('test:e2e', function(done) {
  runSequence(
    'build',
    'test:e2e:run-protractor-server',
    done
  );
}).help = {
  '': 'build the app and run all e2e tests',
  '[ --release ] [ -r ]': 'release mode',
  'Run': [
    '',
    'build',
    'test:e2e:run-protractor-server'
  ].join('\n\t')
};
gulp.task('test:e2e:run-protractor-server', function (done) {

  // Start dev server
  var devServerStrean = gulp.src(targetDir)
    .pipe(gulpWebserver({
      path: '/',
      fallback: 'index.html',
      port: port
    }))
  ;

  gulp.src(['./e2e-tests/*.spec.js'])
    .pipe(angularProtractor({
      'configFile': 'e2e-tests/protractor.conf.js',
      'args': ['--baseUrl', 'http://localhost:' + port],
      'autoStartStopServer': true,
      'debug': true
    }))
    .on('error', function () {
      throw 'e2e tests Failed!';
    })
    .on('end', function () {
      // Kill the dev server
      devServerStrean.emit('kill');

      done();
    });

}).help = {
  '': 'run protractor server and run all e2e tests',
  '[ --release ] [ -r ]': 'release mode'
};



// force debug mode
gulp.task('private:force-debug', function () {
  release = false;
  decideAboutTragetDir();
});
// force release mode
gulp.task('private:force-release', function () {
  release = true;
  decideAboutTragetDir();
});
// no-op = no operation
gulp.task('private:noop', function () { });
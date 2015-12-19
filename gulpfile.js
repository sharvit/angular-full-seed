'use strict';

/**
 * Settings
 */
var appName = 'app';
var scriptsTargetDir = './build/scripts';
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
  gutil,
  stylish,
  gulpWebserver,
  karmaServer,
  childProcess
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
    gutil          = require('gulp-util');
  }

  // Load all the development dependencies
  // Development dependencies should contain all production dependencies
  function loadDevelopmentDependencies () {
    // Development dependencies should contain all production dependencies
    loadProductionDependencies();

    // Load the development dependencies
    stylish        = require('jshint-stylish');
    gulpWebserver  = require('gulp-webserver');
    karmaServer    = require('karma').Server;
    childProcess   = require('child_process');
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
  'build:iconfont',
  'build:locales',
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
  'test:e2e:run-protractor-install',
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
gulp.task('clean:debug', function(done) {
  del([releaseTargetDir, scriptsTargetDir], done);
}).help = {
  '': 'clean debug target directory.'
};
gulp.task('clean:release', function(done) {
  del([debugTargetDir, scriptsTargetDir], done);
}).help = {
  '': 'clean release target directory.'
};


/**
 * Build Tasks
 */
gulp.task('build', function(done) {
  runSequence(
    'build:clean-target',
    'build:iconfont',
    [
      release ? 'private:noop' : 'lint',
      'build:locales',
      'build:fonts',
      'build:templates',
      'build:styles',
      'build:images',
      'build:vendor'
    ],
    'build:scripts',
    'build:index',
    done
  );
}).help = {
  '': 'start run the build proccess',
  '[ --release ] [ -r ]': 'release mode',
  'Run': [
    '',
    'build:clean-target',
    'build:iconfont',
    [
      '[',
      'lint if release?',
      'build:locales',
      'build:fonts',
      'build:templates',
      'build:styles',
      'build:images',
      'build:vendor'
    ].join('\n\t\t'),
    ']',
    'build:scripts',
    'build:index'
  ].join('\n\t')
};
// clean target directory by --release flag
gulp.task('build:clean-target', function(done) {
  del([targetDir, scriptsTargetDir], done);
}).help = {
  '': 'clean target directory',
  '[ --release ] [ -r ]': 'release mode'
};
// generate iconfont
gulp.task('build:iconfont', function(){
  return gulp.src('app/icons/*.svg', {
        buffer: false
    })
    .pipe(plugins.iconfontCss({
      fontName: 'ownIconFont',
      path: 'app/icons/own-icons-template.css',
      targetPath: '../styles/own-icons.css',
      fontPath: '../fonts/'
    }))
    .pipe(plugins.iconfont({
        fontName: 'ownIconFont'
    }))
    .pipe(gulp.dest(path.join(targetDir, 'fonts')))
    .on('error', errorHandler);
}).help = {
  '': 'generate iconfont',
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
    .pipe(gulp.dest(path.join(targetDir, 'templates')))

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

  return gulp.src(vendorFiles)
    .pipe(plugins.concat('vendor.js'))
    .pipe(plugins.if(release, plugins.uglify()))
    .pipe(plugins.if(release, plugins.rev()))

    .pipe(gulp.dest(targetDir))

    .on('error', errorHandler);
}).help = {
  '': 'concatenate and minify vendor sources',
  '[ --release ] [ -r ]': 'release mode'
};
// build templatecache, copy scripts.
// if release: concat, minsafe, uglify and versionize
gulp.task('build:scripts', ['build:scripts:bundle'], function() {
  var dest = path.join(targetDir, 'scripts');

  var minifyConfig = {
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeComments: true
  };

  // prepare angular template cache from html templates
  // (remember to change appName var to desired module name)
  var templateStream = gulp
    .src('**/*.html', { cwd: 'app/templates'})
    .pipe(plugins.angularTemplatecache('templates.js', {
      root: 'templates/',
      module: appName,
      htmlmin: release && minifyConfig
    }));

  var scriptStream = gulp
    .src( ['bundle.js', 'bundle.js.map', 'configuration.js', 'templates.js' ], { cwd: scriptsTargetDir })

    .pipe(plugins.if(!release, plugins.changed(dest)));

  return streamqueue({ objectMode: true }, scriptStream, templateStream)
    .pipe(plugins.if(release, plugins.ngAnnotate()))
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
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(plugins.if(!release,sourcemaps.write('./')))
    .pipe(gulp.dest(scriptsTargetDir));
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

  // get all our javascript sources
  // in development mode, it's better to add each file seperately.
  // it makes debugging easier.
  var _getAllScriptSources = function() {
    var scriptStream = gulp.src(['scripts/app.js', 'scripts/**/*.js'], { cwd: targetDir });
    return streamqueue({ objectMode: true }, scriptStream);
  };

  return gulp.src('app/index.html')
    // inject css
    .pipe(_inject(gulp.src(cssNaming, { cwd: targetDir }), 'app-styles'))
    // inject vendor.js
    .pipe(_inject(gulp.src('vendor*.js', { cwd: targetDir }), 'vendor'))
    // inject app.js (release) or all js files indivually (debug)
    .pipe(plugins.if(release,
      _inject(gulp.src('scripts/app*.js', { cwd: targetDir }), 'app'),
      _inject(_getAllScriptSources(), 'app')
    ))

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
  gulp.watch('app/icons/**', ['build:iconfont']);
  gulp.watch('app/images/**', ['build:images']);
  gulp.watch('./vendor.json', ['build:vendor']);
  gulp.watch('app/src/**/*.html', ['build:templates']);
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
    configFile: __dirname + '/unit-tests/karma.conf.js',
    singleRun: true,
    basePath: targetDir,
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
gulp.task('test:e2e:run-protractor-server', ['test:e2e:run-protractor-install'], function (done) {
  // run dev server
  var devServerStrean = gulp.src(targetDir)
    .pipe(gulpWebserver({
      path: '/',
      port: port
    }));
  // run protractor server
  childProcess.spawn(getProtractorBinary('protractor'), [
    'e2e-tests/protractor.conf.js'
  ], {
    stdio: 'inherit'
  }).once('close', function () {
    // Kill dev server
    devServerStrean.emit('kill');
    done();
  });
}).help = {
  '': 'run protractor server and run all e2e tests',
  '[ --release ] [ -r ]': 'release mode',
  'Run': [
    '',
    'test:e2e:run-protractor-install'
  ].join('\n\t')
};
gulp.task('test:e2e:run-protractor-install', function(done) {
  childProcess.spawn(getProtractorBinary('webdriver-manager'), ['update'], {
      stdio: 'inherit'
  }).once('close', done);
}).help = {
  '': 'install latest protractor server'
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
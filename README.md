# [angular-full-seed] — the full skeleton for AngularJS apps

[![Build Status](https://travis-ci.org/sharvit/angular-full-seed.svg?branch=master)](https://travis-ci.org/sharvit/angular-full-seed)
[![Dependency Status](https://david-dm.org/sharvit/angular-full-seed.svg)](https://david-dm.org/sharvit/angular-full-seed)
[![devDependency Status](https://david-dm.org/sharvit/angular-full-seed/dev-status.svg)](https://david-dm.org/sharvit/angular-full-seed#info=devDependencies)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/sharvit/angular-full-seed)


This project is an application skeleton for a typical [AngularJS] web app.
You can use it to quickly bootstrap your [AngularJS] webapp projects with full workflow environments for these projects.

[angular-full-seed] contains a sample [AngularJS] application and is preconfigured to install the [AngularJS]
framework and a bunch of development, testing and production tools for instant web development gratification.

[angular-full-seed] contains a full workflow, ready to build debug and release versions, serve dev server, run tests, simple deploy and ci deploy.

[angular-full-seed] doesn't do much, just shows how to wire two controllers and views together.

[angular-full-seed] based on the original seed project [angular-seed] created by the [AngularJS] team and on the ionic seed project [ionic-gulp-seed] created by [tmaximini].


## Table of Contents

1. [Features](#features)
2. [Getting Started With a New Project](#getting-started-with-a-new-project)
    1. [Prerequisites](#prerequisites)
    2. [Clone the angular-full-seed Project](#clone-the-angular-full-seed-project)
    3. [Set the local environment](#set-the-local-environment)
    4. [Install Dependencies](#install-dependencies)
    5. [Run the Application in Development](#run-the-application-in-development)
3. [Structure](#structure)
4. [Directory Layout](#directory-layout)
5. [Coding Style](#coding-style)
6. [Building](#building)
  1. [Build a Debug](#build-a-debug)
  2. [Build a Release](#build-a-release)
7. [Serving the Application Files](#serving-the-application-files)
    1. [Running the App during Development](#running-the-app-during-development)
    2. [Running the App in Production](#running-the-app-in-production)
8. [Testing](#testing)
    1. [Unit Testing](#unit-testing)
    2. [End to End Testing](#end-to-end-testing)
9. [Updating Angular](#updating-angular)
10. [Continuous Integration](#continuous-integration)


## Features

* [gulp] jobs for development, building, testing, and running your app.
* Come with a production ready express server.
* Easy deploy to [heroku].
* Comes already with [travis], a continuous integration service, configured to automatically test and deploy to [heroku].
* Comes already with [ui-router] the de-facto solution to flexible routing with nested views.
* Comes already with multi language support.
* Compiles and concatenates your Sass.
* Local development server with live reload.
* Automatically build and inject all your `js` and `css` sources into `index.html`.
* Auto min-safe all Angular DI through [ng-annotate], no need to use weird bracket notation.
* Blazing fast.

## Getting Started With a New Project

To get you started with a new angular project you can fork the [angular-full-seed] and then clone your own repository.

If you don't want to use GitHub as your repository you can clone this repository and then change to another [git] remote.

### Prerequisites

#### [git]

You need [git] to clone the [angular-full-seed] repository.
- [Getting Started Installing Git][git-getting-started]

#### [node.js]

We also use a number of [node.js] tools to initialize and test [angular-full-seed].
You must have [node.js] and its package manager ([npm][npm]) installed.
It is also recommended to use node version manager ([nvm][nvm]).

- [how to install node using npm][getting-started-installing-node]

### Clone the [angular-full-seed] Project

Clone your [angular-full-seed] repository using [git]:

```bash
git clone --depth=1 <your-angular-full-seed-repository-url>
cd angular-full-seed
```

If you want to start a new project without your own fork you can clone the original [angular-full-seed] repository:

```bash
git clone --depth=1 https://github.com/sharvit/angular-full-seed.git <your-project-name>
```

### Set the local environment

Their is some required [environment-variables] to our app.

`NODE_ENV` need to be configured to the right environment (`development` in this case).

 * [what-is-node-env]

We use [dotenv-safe] in order to make it easy,
just duplicate the `.env.example` file to `.env` file:

```bash
cp .env.example .env
```

If we will try to `build`/`run`/`test` the app without the required [environment-variables] we will get this error:

```bash
Error: Missing environment variables: {{VAR_NAME}}
```

### Install Dependencies

We have two kinds of dependencies in [angular-full-seed]:

 1. Tools, help us build, run and test the application.
   * We get the tools we depend upon via `npm`, the [node package manager][npm].
 2. App Components, libraries we will use inside our app (like [AngularJS]).
   * We get the components code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run the release build process, so we can simply do:

```bash
npm install
```

Behind the scenes this will also call `bower install && gulp build --release`. 
You should find that you have three new folders in your project:

* `node_modules` - contains the [npm] packages for the tools we need
* `bower_components` - contains the [bower] components files
* `build` - contains the final builds of our app (`debug`/`release`)

### Run the Application in Development

We have preconfigured the project with a bunch of [gulp] tasks in order manage the workflow.

The simplest way to start this server is:

```bash
gulp serve
```

The development server is running now with [livereload] and the browser should auto open the app.

The app is default running on: `http://localhost:8888`

## Structure

The source code lives inside the `app` folder.

| Source Files                      | Location       |
| --------------------------------- | ---------------- |
| Angular Sources (`js` and `html`) | `app/src`        |
| Styles (`scss`)                   | `app/styles`     |
| Images                            | `app/images`     |
| Fonts                             | `app/fonts`      |
| Locales (`multi language`)        | `app/locales`    |

A lot of starter kits and tutorials encourage you to create an `app` folder for the sources and a `dest` folder the build, but I chose `build` for the destination instead, as it conforms better with most projects. Note that `/build` is gitignored and will be created dynamically during our build process.

Inside the `build` folder their is `build/debug` and `build/release` so we can easily debug the app in development and release a clean version to production.

All 3rd party Javascript sources have to be manually added into `.vendor.json` and will be concatenated into a single `vendor.js` file.
I know there is [wiredep] but I prefer to explicitly control which files get injected and also [wiredep] ends up adding lots of `<script>` tags in your index.html instead of building a single `vendor.js` file.

Unit Testing with [Karma] runner is next to the code and named `*.spec.js`. E2E testing specs are inside `e2e-tests` folder. They both use [MochaJS] as the main framework.

## Directory Layout

```javascript
.
├── Procfile          //Procfile will be used to run the production server
├── README.md
├── app           // App source files
│   ├── favicon.ico
│   ├── index.html      // Main index.html file
│   ├── locales       // Locale files for multi language support
│   │   ├── locale-en.json
│   │   ├── locale-fr.json
│   │   └── locale-he.json
│   ├── src         // Angular source files (js and html)
│   │   ├── app.js      // Main route for the browserify to start build the app
│   │   ├── app.module.js // Main angular module
│   │   ├── components    // Angular components
│   │   │   ├── components.module.js // Angular components main module
│   │   │   └── version       // Version component
│   │   │       ├── interpolate-filter.js     // Some filter
│   │   │       ├── version-directive.js    // Some directive
│   │   │       ├── version.module.js     // Version component main module
│   │   │       └── version.spec.js     // Version unit tests
│   │   ├── core          // Core files
│   │   │   ├── config.js     // Core config
│   │   │   ├── constants.js    // Core constants
│   │   │   ├── core.module.js    // Core main module
│   │   │   ├── router.js     // Core routes
│   │   │   └── run.js        // Core initializations
│   │   └── states        // App States
│   │       ├── dashboard   // dashboard State
│   │       │   ├── dashboard.html      // dashboard view
│   │       │   ├── dashboard.module.js   // dashboard module
│   │       │   ├── state1      // dashboard.state1 State
│   │       │   │   ├── state1.html     // dashboard.state1 view
│   │       │   │   └── state1.module.js  // dashboard.state1 module
│   │       │   └── state2      // dashboard.state2 State
│   │       │       ├── state2.html     // dashboard.state2 view
│   │       │       └── state2.module.js  // dashboard.state2 module
│   │       ├── login       // login State
│   │       │   ├── login.controller.js     // login controller
│   │       │   ├── login.html          // login view
│   │       │   ├── login.module.js       // login module
│   │       │   ├── login.route-config.js   // login route-config
│   │       │   └── login.spec.js   // login unit tests
│   │       └── states.module.js  // States Main Module
│   └── styles    // styles (scss) folder
│       ├── _fonts.scss
│       ├── _variables.scss
│       ├── layout
│       │   └── layout.scss
│       └── main.scss   // main style, from here the build start
├── app.json
├── bower.json
├── bower_components
├── build     // Build results
│   ├── debug   // Debug version
│   └── release   // Release version
├── e2e-tests // End to End tests
│   ├── protractor.conf.js    // e2e tests protractor config
│   └── scenarios.spec.js   // main scenarios
├── gulp    // Gulp workflow tasks
│   ├── errorHandler.js
│   ├── settings.js
│   └── tasks
│       ├── build
│       │   ├── build.favicon.js
│       │   ├── build.fonts.js
│       │   ├── build.images.js
│       │   ├── build.index.js
│       │   ├── build.js
│       │   ├── build.locales.js
│       │   ├── build.scripts.bundle.js
│       │   ├── build.scripts.js
│       │   ├── build.styles.js
│       │   ├── build.templates.js
│       │   └── build.vendor.js
│       ├── clean.js
│       ├── help.js
│       ├── lint.js
│       ├── serve
│       │   ├── serve.js
│       │   └── serve.runserver.js
│       ├── test
│       │   ├── test.e2e.js
│       │   ├── test.e2e.run-protractor-server.js
│       │   ├── test.js
│       │   ├── test.unit.js
│       │   └── test.unit.run-karma-server.js
│       └── watch
│           ├── watch.js
│           ├── watch.source.js
│           └── watch.target.js
├── gulpfile.js
├── node_modules
├── package.json
├── server.js     // Production Server file
├── unit-tests.karma.conf.js  // unit tests karma config file
└── vendor.json   // important to add all our vendors to this file

25 directories, 70 files
```

## Coding Style

Coding style are followed by [johnpapa/angular-styleguide], angular code style guide written by [johnpapa].

## Building

[angular-full-seed] contains a two different builds mode, `debug` and `release` so we can easily debug the app in development and release a clean version to production.

Just run `gulp build` to build a `debug` version and run `gulp build -r` to build a `release` version.

By default, when running the [gulp] tasks like `build`, `serve` and `test`, the will run with the debug version of the app. In order to run tasks with the `release` version, you should run tasks with the flag `--release` or short `-r`:

```bash
gulp build --release
gulp serve --release
gulp test  --release
```

### Build a Debug

build into `build/debug` folder (gitignored)

- build favicon, copy from `app` root to `build/debug` root.
- build fonts, copy from  `app/fonts` to `build/debug/fonts`.
- build images, copy from `app/images` to `build/debug/images`.
- build locales, copy from `app/locales` to `build/debug/locales`.
- build [templatecache] using [gulp-angular-templatecache]
- linting all `*.js` files `app/src`, see `.jshintrc` for ruleset.
- concat all `.js` sources into single `app.js` file with debug [source-mapping-url] flag.
- auto inject all Angular DI through [ng-annotate]
- compiling, concatenating, auto-prefixing of all `.scss` files required by `app/styles/main.scss`.
- creating concat `vendor.js` file from external sources defined in `./vendor.json`.
- automatically inject sources into `index.html` so we don't have to add / remove sources manually.


### Build a Release

build into `build/debug` folder (gitignored)

- minsafe, uglify and versionize `style.css`,  `app.js` and `vendor.js` files.
- remove debugs messages such as `console.log` or `alert`

## Serving the Application Files

While angular is client-side-only technology and it's possible to create angular webapps that
don't require a backend server at all, we recommend serving the project files using a local
webserver during development to avoid issues with security restrictions (sandbox) in browsers. The sandbox implementation varies between browsers, but quite often prevents things like cookies, xhr, etc to function properly when an html page is opened via `file://` scheme instead of `http://`.


### Running the App during Development

The [angular-full-seed] project comes preconfigured with a local development server using [gulp] webserver.

Then you can start your own development web server using the supplied [gulp] script:

```bash
gulp serve
```


### Running the App in Production

If your [AngularJS] app is talking to the backend server via xhr or other means, you need to figure
out what is the best way to host the static files to comply with the same origin policy if
applicable. Usually this is done by hosting the files by the backend server or through
reverse-proxying the backend server(s) and webserver(s).

We prefer to have a micro service in production that only serving the client side [AngularJS] app.

[angular-full-seed] come with a production ready express server, you can run it by:

```bash
node server.js
```

Or with [foreman] by:


```bash
foreman start
```

**This [angular-full-seed] project is hosting on a micro service on [heroku]:**

  +  [https://angular-full-seed.herokuapp.com](https://angular-full-seed.herokuapp.com)

#### Heroku

[Heroku] is a cloud Platform-as-a-Service supporting several programming languages.

Create new app using [heroku]:

```bash
heroku create <your-app-name>
```

Push the app to [heroku] using [git]:

```bash
git push heroku master
```

[heroku] will build the app and host it for you.

## Testing

There are two kinds of tests in the [angular-full-seed] application: Unit tests and End to End tests.

  1. [Unit Testing](#unit-testing)
  2. [End to End Testing](#end-to-end-testing)

### Unit Testing

The [angular-full-seed] app comes preconfigured with unit tests. These are written in
[jasmine], which we run with the [Karma Test Runner][karma]. We provide a [karma]
configuration file to run them.

* the configuration is found at `unit-tests.karma.conf.js`.
* the unit tests are found next to the code they are testing and are named as `*.spec.js`.

The easiest way to run the unit tests is to use the supplied [gulp] script:

```
gulp test:unit
```

This script will start the Karma test runner to execute the unit tests.

### End to End Testing

The [angular-full-seed] app comes with end-to-end tests, again written in [Jasmine][jasmine]. These tests
are run with the [protractor] End-to-End test runner.  It uses native events and has
special features for [AngularJS] applications.

* the configuration is found at `e2e-tests/protractor-conf.js`
* the end-to-end tests are found in `e2e-tests/scenarios.js`

Protractor simulates interaction with our web app and verifies that the application responds
correctly.

You can run the end-to-end tests using the supplied [gulp] script:

```
gulp test:e2e
```

This script will run a development server and then execute the end-to-end tests against the application being hosted on the development server.

You can run run the whole tests together (`unit` and `e2e`) using the supplied [gulp] script:

```
gulp test
```


## Updating Angular

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

You can update the [bower] dependencies by running:

```
bower update
```

This will find the latest versions that match the version ranges specified in the `bower.json` file.

## Continuous Integration

### Travis CI

[Travis CI][travis] is a continuous integration service, which can monitor GitHub for new commits
to your repository and execute scripts such as building the app, running tests and deploy to [heroku].

The [angular-full-seed] project contains a [Travis] configuration file, `.travis.yml`, which will cause Travis to run your tests and auto deploy to [heroku] when you push to GitHub.

You will need to enable the integration between [Travis] and GitHub. See the Travis website for more instruction on how to do this.

In order to allow [travis] deploy premissions to [heroku] you will need first to install [travis-ci-client]:

```bash
gem install travis
```

After installing [travis-ci-client] :

```bash
travis encrypt $(heroku auth:token) --add deploy.api_key
```

This will add your [heroku] encrypted auth token to the [travis] configuration file: `.travis.yml`.

Now you can make changes and push to GitHub, then [travis] will run your tests and deploy your changes to [heroku].



**[Back to top](#table-of-contents)**



[angular-full-seed]: https://github.com/sharvit/angular-full-seed
[AngularJS]: http://angularjs.org/
[angular-seed]: https://github.com/angular/angular-seed
[ionic-gulp-seed]: https://github.com/tmaximini/ionic-gulp-seed
[tmaximini]: http://www.thomasmaximini.com/
[ui-router]: https://github.com/angular-ui/ui-router
[git]: http://git-scm.com/
[git-getting-started]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[node.js]: https://nodejs.org
[npm]: https://www.npmjs.org/
[nvm]: http://nvm.sh/
[getting-started-installing-node]: https://docs.npmjs.com/getting-started/installing-node
[bower]: http://bower.io
[environment-variables]: https://en.wikipedia.org/wiki/Environment_variable
[what-is-node-env]: http://stackoverflow.com/questions/16978256/what-is-node-env-in-express?answertab=active#tab-top
[dotenv-safe]: https://github.com/rolodato/dotenv-safe
[gulp]: http://gulpjs.com/
[livereload]: http://livereload.com/
[johnpapa/angular-styleguide]: https://github.com/johnpapa/angular-styleguide
[johnpapa]: http://johnpapa.net
[jasmine]: https://jasmine.github.io
[protractor]: https://github.com/angular/protractor
[karma]: https://karma-runner.github.io
[heroku]: https://heroku.com
[travis]: https://travis-ci.org/
[travis-ci-client]: https://github.com/travis-ci/travis.rb
[wiredep]: (https://github.com/taptapship/wiredep)
[MochaJS]: https://mochajs.org/
[gulp-webserver]: https://github.com/schickling/gulp-webserver
[source-mapping-url]: http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/
[templatecache]: https://docs.angularjs.org/api/ng/service/$templateCache
[gulp-angular-templatecache]: https://github.com/miickel/gulp-angular-templatecache
[foreman]: https://github.com/ddollar/foreman
[ng-annotate]: https://github.com/olov/ng-annotate

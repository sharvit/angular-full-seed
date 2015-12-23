


# [angular-full-seed] — the seed for AngularJS apps

[![Build Status](https://travis-ci.org/sharvit/angular-full-seed.svg?branch=master)](https://travis-ci.org/sharvit/angular-full-seed)
[![Dependency Status](https://david-dm.org/sharvit/angular-full-seed.svg)](https://david-dm.org/sharvit/angular-full-seed)
[![devDependency Status](https://david-dm.org/sharvit/angular-full-seed/dev-status.svg)](https://david-dm.org/sharvit/angular-full-seed#info=devDependencies)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/sharvit/angular-full-seed)


This project is an application skeleton for a typical [AngularJS] web app.
You can use it to quickly bootstrap your [AngularJS] webapp projects and all environments for these
projects.

[angular-full-seed] contains a sample [AngularJS] application and is preconfigured to install the [AngularJS]
framework and a bunch of development, testing and production tools for instant web development gratification.

[angular-full-seed] contains a full workflow, ready to build debug and release versions, serve dev server, run tests, simple deploy and ci deploy.

[angular-full-seed] doesn't do much, just shows how to wire two controllers and views together.

## Table of Contents

1. [Getting Started With a New Project](#getting-started-with-a-new-project)
    1. [Prerequisites](#prerequisites)
    2. [Clone angular-full-seed](#clone-angular-full-seed)
    3. [Set the local environment](#set-the-local-environment)
    4. [Install Dependencies](#install-dependencies)
    5. [Run the Application in Development](#run-the-application-in-development)
2. [Directory Layout](#directory-layout)
3. [Testing](#testing)
    1. [Running Unit Tests](#running-unit-tests)
    2. [End to end testing](#end-to-end-testing)
4. [Updating Angular](#updating-angular)
5. [Serving the Application Files](#serving-the-application-files)
    1. [Running the App during Development](#running-the-app-during-development)
    2. [Running the App in Production](#running-the-app-in-production)
        1. [Heroku](#Heroku)
6. [Continuous Integration](#continuous-integration)

## Getting Started With a New Project

To get you started with a new angular project you can fork the [angular-full-seed] and then clone your own repository

If you don't want to use GitHub as your repository you can clone this repository and then change to another [git] remote

### Prerequisites

#### [git]

You need [git] to clone the [angular-full-seed] repository.
- [Getting Started Installing Git][git-getting-started]

#### [node.js]

We also use a number of [node.js] tools to initialize and test [angular-full-seed].
You must have [node.js] and its package manager ([npm][npm]) installed.
It is also recommended to use node version manager ([nvm][nvm]).

- [how to install node using npm][getting-started-installing-node]

### Clone [angular-full-seed]

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

## Coding Style

Coding style are followed by [johnpapa/angular-styleguide], angular code style guide written by [johnpapa].

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

[angular styleguide by johnpapa][https://github.com/johnpapa/angular-styleguide]

## Testing

There are two kinds of tests in the [angular-full-seed] application: Unit tests and End to End tests.

  1. [Running Unit Tests](#running-unit-tests)
  2. [End to end testing](#end-to-end-testing)

### Running Unit Tests

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

### End to end testing

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

You can run run the whole tests (`unit` and `e2e`) together using the supplied [gulp] script:

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


## Serving the Application Files

While angular is client-side-only technology and it's possible to create angular webapps that
don't require a backend server at all, we recommend serving the project files using a local
webserver during development to avoid issues with security restrictions (sandbox) in browsers. The
sandbox implementation varies between browsers, but quite often prevents things like cookies, xhr,
etc to function properly when an html page is opened via `file://` scheme instead of `http://`.


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



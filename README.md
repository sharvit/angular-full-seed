# [angular-seed] — the seed for AngularJS apps

[![Build Status](https://travis-ci.org/sharvit/angular-seed.svg?branch=master)](https://travis-ci.org/sharvit/angular-seed)
[![Dependency Status](https://david-dm.org/sharvit/angular-seed.svg)](https://david-dm.org/sharvit/angular-seed)
[![devDependency Status](https://david-dm.org/sharvit/angular-seed/dev-status.svg)](https://david-dm.org/sharvit/angular-seed#info=devDependencies)

This project is an application skeleton for a typical [AngularJS] web app.
You can use it to quickly bootstrap your [AngularJS] webapp projects and all environments for these
projects.

[angular-seed] contains a sample [AngularJS] application and is preconfigured to install the [AngularJS]
framework and a bunch of development, testing and production tools for instant web development gratification.

[angular-seed] contains a full workflow, ready to build debug and release versions, serve dev server, run tests, simple deploy and ci deploy.

[angular-seed] doesn't do much, just shows how to wire two controllers and views together.

## Table of Contents

  1. [Getting Started](#getting-started)
    1. [Prerequisites](#prerequisites)
    2. [Clone angular-seed](#clone-angular-seed)
    3. [Set the local environment](#set-the-local-environment)
    4. [Install Dependencies](#install-dependencies)
    5. [Run the Application in Development](#run-the-application-in-development)
  2. [Directory Layout](#directory-layout)
  3. [Testing](#testing)
    1. [Running Unit Tests](#running-unit-tests)
    2. [End to end testing](#end-to-end-testing)
  4. [Updating Angular](#updating-angular)

## Getting Started

To get you started you can simply clone the [angular-seed] repository and install the dependencies:

### Prerequisites

#### [git]

You need [git] to clone the [angular-seed] repository.

- [Getting Started Installing Git][git-getting-started]

#### [node.js]

We also use a number of [node.js] tools to initialize and test [angular-seed].
You must have [node.js] and its package manager ([npm][npm]) installed.
It is also recommended to use node version manager ([nvm][nvm]).

- [how to install node using npm][getting-started-installing-node]

### Clone [angular-seed]

Clone the [angular-seed] repository using [git]:

```bash
git clone https://github.com/sharvit/angular-seed.git
cd angular-seed
```

If you just want to start a new project without the [angular-seed] commit history then you can do:

```bash
git clone --depth=1 https://github.com/sharvit/angular-seed.git <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

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

We have two kinds of dependencies in [angular-seed]:

 1. Tools, help us build, run and test the application.
   * We get the tools we depend upon via `npm`, the [node package manager][npm].
 2. App Components, libraries we will use inside our app (like [AngularJS]).
   * We get the components code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run the release build process, so we can simply do:

```bash
npm install
```

Behind the scenes this will also call `bower install && gulp build --release`. 
You should find that you have three new folders in your project.

* `node_modules` - contains the [npm] packages for the tools we need
* `bower_components` - contains the [bower] components files
* `build` - contains the final builds of our app (`debug`/`release`)

### Run the Application in Development

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
gulp serve
```

The development server is running now and the browser should auto open the app.
The app is default running on `http://localhost:8888`

## Directory Layout

```
I will do that at the end
```

## Testing

There are two kinds of tests in the [angular-seed] application: Unit tests and End to End tests.

  1. [Running Unit Tests](#running-unit-tests)
  2. [End to end testing](#end-to-end-testing)

### Running Unit Tests

The angular-seed app comes preconfigured with unit tests. These are written in
[jasmine], which we run with the [Karma Test Runner][karma]. We provide a Karma
configuration file to run them.

* the configuration is found at `karma.conf.js`
* the unit tests are found next to the code they are testing and are named as `..._test.js`.

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

This script will start the Karma test runner to execute the unit tests. Moreover, Karma will sit and
watch the source and test files for changes and then re-run the tests whenever any of them change.
This is the recommended strategy; if your unit tests are being run every time you save a file then
you receive instant feedback on any changes that break the expected code functionality.

You can also ask Karma to do a single run of the tests and then exit.  This is useful if you want to
check that a particular version of the code is operating as expected.  The project contains a
predefined script to do this:

```
npm run test-single-run
```


### End to end testing

The angular-seed app comes with end-to-end tests, again written in [Jasmine][jasmine]. These tests
are run with the [Protractor][protractor] End-to-End test runner.  It uses native events and has
special features for Angular applications.

* the configuration is found at `e2e-tests/protractor-conf.js`
* the end-to-end tests are found in `e2e-tests/scenarios.js`

Protractor simulates interaction with our web app and verifies that the application responds
correctly. Therefore, our web server needs to be serving up the application, so that Protractor
can interact with it.

```
npm start
```

In addition, since Protractor is built upon WebDriver we need to install this.  The angular-seed
project comes with a predefined script to do this:

```
npm run update-webdriver
```

This will download and install the latest version of the stand-alone WebDriver tool.

Once you have ensured that the development web server hosting our application is up and running
and WebDriver is updated, you can run the end-to-end tests using the supplied npm script:

```
npm run protractor
```

This script will execute the end-to-end tests against the application being hosted on the
development server.


## Updating Angular

Previously we recommended that you merge in changes to angular-seed into your own fork of the project.
Now that the angular framework library code and tools are acquired through package managers (npm and
bower) you can use these tools instead to update the dependencies.

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

You can update the Angular dependencies by running:

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

The angular-seed project comes preconfigured with a local development webserver.  It is a node.js
tool called [http-server][http-server].  You can start this webserver with `npm start` but you may choose to
install the tool globally:

```
sudo npm install -g http-server
```

Then you can start your own development web server to serve static files from a folder by
running:

```
http-server -a localhost -p 8000
```

Alternatively, you can choose to configure your own webserver, such as apache or nginx. Just
configure your server to serve the files under the `app/` directory.


### Running the App in Production

This really depends on how complex your app is and the overall infrastructure of your system, but
the general rule is that all you need in production are all the files under the `app/` directory.
Everything else should be omitted.

Angular apps are really just a bunch of static html, css and js files that just need to be hosted
somewhere they can be accessed by browsers.

If your Angular app is talking to the backend server via xhr or other means, you need to figure
out what is the best way to host the static files to comply with the same origin policy if
applicable. Usually this is done by hosting the files by the backend server or through
reverse-proxying the backend server(s) and webserver(s).


## Continuous Integration

### Travis CI

[Travis CI][travis] is a continuous integration service, which can monitor GitHub for new commits
to your repository and execute scripts such as building the app or running tests. The angular-seed
project contains a Travis configuration file, `.travis.yml`, which will cause Travis to run your
tests when you push to GitHub.

You will need to enable the integration between Travis and GitHub. See the Travis website for more
instruction on how to do this.

### CloudBees

CloudBees have provided a CI/deployment setup:

<a href="https://grandcentral.cloudbees.com/?CB_clickstart=https://raw.github.com/CloudBees-community/angular-js-clickstart/master/clickstart.json">
<img src="https://d3ko533tu1ozfq.cloudfront.net/clickstart/deployInstantly.png"/></a>

If you run this, you will get a cloned version of this repo to start working on in a private git repo,
along with a CI service (in Jenkins) hosted that will run unit and end to end tests in both Firefox and Chrome.


## Contact

For more information on AngularJS please check out http://angularjs.org/

**[Back to top](#getting-started)**

[angular-seed]: https://github.com/sharvit/angular-seed
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
[jasmine]: https://jasmine.github.io
[protractor]: https://github.com/angular/protractor
[karma]: https://karma-runner.github.io
[travis]: https://travis-ci.org/

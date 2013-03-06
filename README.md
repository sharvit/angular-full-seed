# Angular Enterprise Seed - An AngularJS seed for serious web apps

***

# Goals

***

* Serve as a more substantial starting point for enterprise and commercial web applications
* Remain static, as in no web server _processing_ required
  - The only need for a web server is to host the contents of the app folder
* Integrate best-of-breed JavaScript MVC, styling, ui, and tooling components "the Angular way"
* Provide examples of services, directives, controllers, and filters in a way that can be cherry picked for use elsewhere
  - See Authentication and REST service examples
  - See fade and stop-propagation directive examples
* Provide example of ui widgets done the Angular way
  - See the Playground menu option in the top navbar
  - UI/widget examples include a paginated grid with sort and filter support, accordion, tree, tabs, and date/time pickers


# Usage

***

##  Requirements

### For hosting

* A web server - Can be anything Python SimpleHTTPServer, NodeJS, Apache, Google App Engine.
  - Just start the server and navigate to app/index.html

### For LESS compilation (only needed if modifying LESS)
* The project contains all LESS-compiled, vendor provided, and custom styling under app/css.  If you wish to contribute or modify LESS, you should run build.sh, which compiles the less code.  This requires the following:
  - Node Package Manager (npm).  Run "sudo apt-get install npm"
  - recess, jslint, and a host of other packages.  Run "npm install" from the bootstrap directory (That's it, with the latest release Bootstrap simplified things a bit)

# Integrated Technologies - "The Stack"

***

* angularjs - Superheroic JavaScript MVW Framework.
* angular-ui - The companion suite for AngularJS.
* Twitter Bootstrap - Sleek, intuitive, and powerful front-end framework for faster and easier web development.
* angular-strap - Bootstrap directives for Angular.
* jquery - The Write Less, Do More, JavaScript Library.
* jquery-ui - The Write Less, Do More, JavaScript Library.
* ng-grid - Angular Data Grid.
* modernizr - A JavaScript library that detects HTML5 and CSS3 features in the user’s browser.
* underscorejs - Underscore is a utility-belt library for JavaScript that provides a lot of the functional programming support that you would expect in Prototype.js (or Ruby), but without extending any of the built-in JavaScript objects.
* prettifyjs - A Javascript module and CSS file that allows syntax highlighting of source code snippets in an html page.
* Animate.css -  Just-add-water CSS animation. via Ad Packs. animate.css is a bunch of cool, fun, and cross-browser animations for you to use in your projects.
* LESS - The dynamic stylesheet language.  LESS extends CSS with dynamic behavior such as variables, mixins, operations and functions.

# Contributing

***

Please submit all pull requests against *-wip branches.  If it includes LESS changes, please compile the less to app/css and include the compiled css in your changes.

## Wish list...

TODO - Move these to project issues...

* Tests.  We have a test story based on the original angular-seed, but haven't touched them since.  We need the tests fleshed out to represent the current state of the application.
* CSS - Cleanup app.css and move it into the Bootstrap/LESS dir.  Since the LESS will then become Bootstrap + Application specific code, may want to reorganize the project a bit.  IE rename the root to LESS with subfolders for Bootstrap and Custom (or App).  Should compile to min.css.
* Extend the authorization service
* File upload widget with working controller integration.  This will be a challenge to do maintaining the goal of no server-side requirements.  Perhaps mockup as much as possible.
* Some focus on responsiveness.  Responsiveness is for the most part looking pretty good, but could always use a little help.
* Consider using grunt
* Additional/better service and filter examples.
* Include all angular-strap and angular-ui widgets (playground contains roughly 70% today)

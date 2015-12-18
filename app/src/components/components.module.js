(function() {
  'use strict';

  /**
  * @ngdoc overview
  * @name Appevivo
  * @description
  * # Initializes main application and routing
  *
  * Main module of the application.
  */
  angular
    .module('app.components', [
      'app.components.version'
    ])

    ;

    require('./version/version.module.js');

})();
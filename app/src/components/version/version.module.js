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
    .module('app.components.version', [
      'app.components.version.interpolate-filter',
      'app.components.version.version-directive'
    ])

    .value('version', '0.0.1')

    ;

    require('./interpolate-filter.js');
    require('./version-directive.js');

})();

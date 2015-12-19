(function() {
  'use strict';

  /**
  * @ngdoc overview
  * @name app
  * @description
  * # Initializes main application and routing
  *
  * Main module of the application.
  */
  angular
    .module('app', [
      'app.core',

      'app.components',
      'app.views'
    ])
  ;

  require('./core/core.module.js');
  require('./components/components.module.js');
  require('./views/views.module.js');

})();
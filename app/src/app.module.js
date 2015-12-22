(function() {
  'use strict';

  /**
  *
  * Main module of the application.
  *
  */
  angular
    .module('app', [
      'ui.router',

      'app.core',

      'app.components',
      'app.states'
    ])
  ;

  require('./core/core.module.js');
  require('./components/components.module.js');
  require('./states/states.module.js');

})();
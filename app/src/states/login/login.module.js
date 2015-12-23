(function() {
  'use strict';

  angular
    .module('app.states.login', [
      'ui.router',

      'app.core'
    ])
  ;

  require('./login.route-config.js');
  require('./login.controller.js');

})();
(function() {
  'use strict';

  angular
    .module('app.states.login', [
      'ui.router'
    ])
  ;

  require('./login.route-config.js');
  require('./login.controller.js');

})();
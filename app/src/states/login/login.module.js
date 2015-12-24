(function() {
  'use strict';

  angular
    .module('app.states.login', [
      'app.core'
    ])
  ;

  require('./login.route-config.js');
  require('./login.controller.js');

})();
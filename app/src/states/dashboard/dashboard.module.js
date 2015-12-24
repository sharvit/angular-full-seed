(function() {
  'use strict';

  angular
    .module('app.states.dashboard', [
      
      'app.states.dashboard.state1',
      'app.states.dashboard.state2'
    ])
  ;

  require('./dashboard.route-config.js');
  require('./dashboard.controller.js');

  require('./state1/state1.module.js');
  require('./state2/state2.module.js');
})();
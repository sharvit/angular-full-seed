(function() {
  'use strict';

  angular
    .module('app.states.dashboard', [
      
      'app.states.dashboard.state1',
      'app.states.dashboard.state2'
    ])
  ;

  require('./dashboard.config.js');

  require('./state1/state1.module.js');
  require('./state2/state2.module.js');
})();
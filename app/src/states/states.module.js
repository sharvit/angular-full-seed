(function() {
  'use strict';

  angular
    .module('app.states', [
        'app.states.login',
        'app.states.dashboard'
    ])

    ;

    require('./login/login.module.js');
	require('./dashboard/dashboard.module.js');

})();
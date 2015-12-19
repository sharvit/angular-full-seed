(function() {
  'use strict';

  angular
    .module('app.views', [
      'app.views.view1',
      'app.views.view2'
    ])

  ;

	require('./view1/view1.js');
	require('./view2/view2.js');

})();
(function() {
  'use strict';

  angular
    .module('app.states.countries', [
      
      'app.states.countries.list',
      'app.states.countries.show'
    ])
  ;

  require('./countries.config.js');

  require('./list/list.module.js');
  require('./show/show.module.js');
})();
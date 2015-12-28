(function() {
  'use strict';

  angular
    .module('app.states.countries', [
      
      'app.states.countries.countries-list',
      'app.states.countries.show-country'
    ])
  ;

  require('./countries.config.js');

  require('./countries-list/countries-list.module.js');
  require('./show-country/show-country.module.js');
})();
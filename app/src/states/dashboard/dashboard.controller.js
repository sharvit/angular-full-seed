(function() {
  'use strict';

  angular
    .module('app.states.dashboard')

    .controller('DashboardController', DashboardController)

  ;

  /* @ngInject */
  function DashboardController ($translate) {
    var vm = this;
    vm.changeLanguage = changeLanguage;

    ////////////////

    function changeLanguage (localeKey) {
      console.log('changeLanguage', localeKey);
      
      // tells angular-translate to use the new language
      $translate.use(localeKey);
    }
  }

})();
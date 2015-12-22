(function() {
  'use strict';

  angular
    .module('app.components.version.interpolate-filter', [

    ])

    .filter('interpolate', interpolate)

  ;

  /* @ngInject */
  function interpolate (version) {
    return function (text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }

})();
(function() {
  'use strict';

  angular
    .module('app.components.version.version-directive', [

    ])

    .directive('appVersion', appVersion)

  ;

  appVersion.$inject = ['version'];

  function appVersion (version) {
    return function(scope, elm) {
      elm.text(version);
    };
  }


})();
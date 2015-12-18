'use strict';

angular.module('app.components.version.version-directive', [])

.directive('appVersion', ['version', function(version) {
  return function(scope, elm) {
    elm.text(version);
  };
}]);

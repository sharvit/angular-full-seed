(function() {
    'use strict';

    angular
        .module('app.components.version')

        .directive('appVersion', appVersion)
    ;

    /* @ngInject */
    function appVersion (version) {
        // Usage:
        //
        // Creates:
        //      Write the app version
        //
        return link;

        function link (scope, element) {
            element.text(version);
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app.components.countries')

        .directive('countryImage', countryImage)
    ;

    /* @ngInject */
    function countryImage () {
        // Usage:
        //
        // Creates:
        //      Render country flag image from country code (attrs.countryImage)
        //
        return link;

        function link (scope, element, attrs) {
            element.attr('src', 'http://www.geonames.org/flags/x/' + attrs.countryImage.toLowerCase() + '.gif');
        }
    }
})();
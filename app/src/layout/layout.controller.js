(function() {
    'use strict';

    angular
        .module('app.layout')

        .controller('LayoutController', LayoutController)
    ;

    /* @ngInject */
    function LayoutController ($translate) {
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
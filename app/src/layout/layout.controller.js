(function() {
    'use strict';

    angular
        .module('app.layout')

        .controller('LayoutController', LayoutController)
    ;

    /* @ngInject */
    function LayoutController ($translate, supportedLanguages) {
        var vm = this;
        vm.changeLanguage = changeLanguage;
        vm.supportedLanguages = supportedLanguages;

        ////////////////

        function changeLanguage (localeKey) {
            console.log('changeLanguage', localeKey);

            // tells angular-translate to use the new language
            $translate.use(localeKey);
        }
    }

})();
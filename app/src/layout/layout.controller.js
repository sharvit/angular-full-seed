(function() {
    'use strict';

    angular
        .module('app.layout')

        .controller('LayoutController', LayoutController)
    ;

    /* @ngInject */
    function LayoutController ($translate, I18N_CONFIG) {
        var vm = this;
        vm.changeLanguage = changeLanguage;
        vm.supportedLanguages = I18N_CONFIG.avilableLocales;

        ////////////////

        function changeLanguage (localeKey) {
            console.log('changeLanguage', localeKey);

            // tells angular-translate to use the new language
            $translate.use(localeKey);
        }
    }

})();
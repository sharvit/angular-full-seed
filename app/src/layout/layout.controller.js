(function() {
    'use strict';

    angular
        .module('app.layout')

        .controller('LayoutController', LayoutController)
    ;

    /* @ngInject */
    function LayoutController ($rootScope, $translate, $timeout, I18N_CONFIG) {
        var vm = this;
        vm.currentLocale = null;
        vm.currentLocaleNativeName = null;
        vm.isNavbarCollapsed = true;
        vm.toggleNavbar = toggleNavbar;
        vm.changeLanguage = changeLanguage;
        vm.avilableLocales = I18N_CONFIG.avilableLocales;

        activate();

        ////////////////

        function activate () {
            return setCurrentLocale($translate.use());
        }

        function changeLanguage (localeKey) {
            // tells angular-translate to use the new language
            return $translate.use(localeKey)
                .then(setCurrentLocale)
            ;
        }

        function toggleNavbar () {
            vm.isNavbarCollapsed = !vm.isNavbarCollapsed;
        }

        function setCurrentLocale (currentLocale) {
            vm.currentLocale = currentLocale;
        }
    }

})();
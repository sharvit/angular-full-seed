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
        vm.avilableLocalesNames = I18N_CONFIG.avilableLocalesNames;

        activate();

        ////////////////

        function activate () {
            return setCurrentLocale($translate.use());
        }

        function changeLanguage (localeKey) {
            console.log('LayoutController.changeLanguage', localeKey);

            // tells angular-translate to use the new language
            return $translate.use(localeKey)
                .then(setCurrentLocale)
            ;
        }

        function toggleNavbar () {
            console.log('LayoutController.toggleNavbar', !vm.isNavbarCollapsed);
            vm.isNavbarCollapsed = !vm.isNavbarCollapsed;
        }

        function setCurrentLocale (currentLocale) {
            console.log('LayoutController.setCurrentLocale', currentLocale);

            vm.currentLocale = currentLocale;

            return $translate('languages.' + vm.currentLocale)
                .then(setCurrentLocaleNativeName)
            ;
        }

        function setCurrentLocaleNativeName (currentLocaleNativeName) {
            console.log('LayoutController.setCurrentLocaleNativeName', currentLocaleNativeName);

            vm.currentLocaleNativeName = currentLocaleNativeName;
        }
    }

})();
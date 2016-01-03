(function() {
    'use strict';

    angular
        .module('app.layout')

        .controller('LayoutController', LayoutController)
    ;

    /* @ngInject */
    function LayoutController ($localeSelectorDialog, $translate, I18N_CONFIG) {
        var vm = this;

        vm.isNavbarCollapsed = true;
        vm.toggleNavbar = toggleNavbar;
        vm.changeLocale = changeLocale;

        activate();

        ////////////////

        function activate () {
            
        }

        function changeLocale () {
            return $localeSelectorDialog
                .open({
                    locales: I18N_CONFIG.avilableLocales,
                    showFlags: true,
                    showSearch: true,
                    contributeUrl: 'https://yumday.oneskyapp.com/collaboration/project?id=53193'
                })
                .result
                .then(updateAppLocale)
            ;
        }

        function toggleNavbar () {
            vm.isNavbarCollapsed = !vm.isNavbarCollapsed;
        }

        function updateAppLocale (locale) {
            // tells angular-translate to use the new language
            return $translate.use(locale);
        }
    }

})();
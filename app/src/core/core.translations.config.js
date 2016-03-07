(function() {
    'use strict';

    angular
        .module('app.core')
        
        .config(TranslationsConfig)
    ;

    function TranslationsConfig ($translateProvider, I18N_CONFIG) {
        var availableLanguageKeys = Object.keys(I18N_CONFIG.avilableLocales);

        var localesMap = I18N_CONFIG.localesMap;
        localesMap['*'] = I18N_CONFIG.defaultLocale;

        $translateProvider
            .useStaticFilesLoader({
                prefix: 'locales/',
                suffix: '.json'
            })
            .registerAvailableLanguageKeys(availableLanguageKeys, localesMap)
            .useLocalStorage()
            .useSanitizeValueStrategy('escape')
            .determinePreferredLanguage()
        ;
    }
})();
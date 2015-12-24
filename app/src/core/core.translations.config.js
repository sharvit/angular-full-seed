(function() {
    'use strict';

    angular
        .module('app.core')
        
        .config(TranslationsConfig)
    ;

    function TranslationsConfig ($translateProvider) {
        $translateProvider
            .useStaticFilesLoader({
            prefix: 'locales/',
            suffix: '.json'
            })
            .registerAvailableLanguageKeys(['en', 'he', 'fr'], {
            'en_*': 'en',
            'he_*': 'he',
            'fr_*': 'fr'
            })
            .useLocalStorage()
            .useSanitizeValueStrategy('escape')
            .determinePreferredLanguage()
        ;
    }
})();
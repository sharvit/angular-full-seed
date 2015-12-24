(function() {
	'use strict';

	angular
		.module('app.core')
		.config(TranslationsConfig)
	;

	function TranslationsConfig ($translateProvider) {
    $translateProvider
      .useStaticFilesLoader({
        prefix: 'locales/locale-',
        suffix: '.json'
      })
      .registerAvailableLanguageKeys(['en', 'he', 'fr'], {
        'en_*': 'en',
        'he_*': 'he',
        'fr_*': 'fr'
      })
      .determinePreferredLanguage()
      .fallbackLanguage('en')
      .useSanitizeValueStrategy('escape')
      .useLocalStorage()
    ;
	}
})();
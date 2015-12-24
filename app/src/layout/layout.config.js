(function() {
    'use strict';

    angular
        .module('app.layout')

        .config(config)
    ;

    /* @ngInject */
    function config ($stateProvider) {
        $stateProvider.state('app', {
            abstract: true,
            url: '',
            templateUrl: 'templates/layout/layout.html',
            controller: 'LayoutController',
            controllerAs: 'vm',
            resolve: {
                resolveTranslation: resolveTranslation
            }
        });
    }

    /* @ngInject */
    function resolveTranslation ($translate) {
        return $translate.onReady();
    }

})();
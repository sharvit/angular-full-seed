(function() {
    'use strict';

    angular
        .module('app.states.dashboard.state2')

        .config(config)
    ;

    /* @ngInject */
    function config ($stateProvider) {
        $stateProvider.state('app.dashboard.state2', {
            url: '/state2',
            templateUrl: 'templates/states/dashboard/state2/state2.html'
        });
    }

})();
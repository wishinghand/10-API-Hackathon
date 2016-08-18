(function() {
    'use strict';

    angular
        .module('app')
        .factory('DemoMapFactory', DemoMapFactory);

    DemoMapFactory.$inject = ['$http', '$q'];

    /* @ngInject */
    function DemoMapFactory($http, $q) {
        var service = {
            getDemoMapInfo: getDemoMapInfo
        };
        return service;

        ////////////////

        function getDemoMapInfo() {
        }
    }
})();
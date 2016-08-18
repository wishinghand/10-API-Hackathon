(function() {
    'use strict';

    angular
        .module('app')
        .factory('GoogleAPIFactory', GoogleAPIFactory);

    GoogleAPIFactory.$inject = ['$http', '$q'];

    /* @ngInject */
    function GoogleAPIFactory($http, $q) {
        var service = {
            getGooglePlaces: getGooglePlaces
        };

        return service;

        ////////////////

        function getGooglePlaces() {
            var defer = $q.defer();

            $http({
                method: "GET",
                url: ''
            }).then(function(response){
                defer.resolve(response.data.Search);
            }, function(response){
                defer.reject("Server not found");
            });

            return defer.promise;
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app')
        .controller('addressInputCtrl', addressInputCtrl);

    addressInputCtrl.$inject = ['GoogleAPIFactory'];

    /* @ngInject */
    function addressInputCtrl(GoogleAPIFactory) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'addressInputCtrl';
        vm.addressInput = "";

        vm.searchForThingsToDo = searchForThingsToDo;

        function searchForThingsToDo() {
            var fullAddress = addresssInput.formattedAddress;
            // GoogleAPIFactory.getGooglePlaces(fullAddress);
        }
    }
})();
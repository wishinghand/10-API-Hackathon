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

        function searchForThingsToDo(selectedTypes) {

            var fullAddress = vm.addressInput.formatted_address;
            // var latlng = codeAddress(fullAddress);
            // console.log(latlng);
            var coords = [vm.addressInput.geometry.location.lat(), vm.addressInput.geometry.location.lng()];
            GoogleAPIFactory.setMapCenter(coords);
            GoogleAPIFactory.getGooglePlaces(selectedTypes);
        }

        function codeAddress(address) {
            var geocoder = new google.maps.Geocoder();

            geocoder.geocode({ 'address': address }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    return results[0].geometry.location;
                } else {
                    return null;
                }
            });
        }
    }
})();

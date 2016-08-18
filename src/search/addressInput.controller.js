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

            var fullAddress = vm.addressInput.formatted_address;
            // var latlng = codeAddress(fullAddress);
            // console.log(latlng);
            var coords = [vm.addressInput.geometry.location.lat(), vm.addressInput.geometry.location.lng()];
            GoogleAPIFactory.setMapCenter(coords);
        }

        function codeAddress(address) {
            var geocoder = new google.maps.Geocoder();

            geocoder.geocode({ 'address': address }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    // console.log("ok!");
                    // //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
                    // //map.setCenter(results[0].geometry.location);
                    // var marker = new google.maps.Marker({
                    //     map: map,
                    //     position: results[0].geometry.location
                    // });
                    console.log(results);
                    return results[0].geometry.location;
                } else {
                    return null;
                }
            });
        }
    }
})();

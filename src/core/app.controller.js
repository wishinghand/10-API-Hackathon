(function() {
    'use strict';

    angular
        .module('app')
        .controller('appCtrl', appCtrl);

    appCtrl.$inject = ['GoogleAPIFactory'];

    /* @ngInject */
    function appCtrl(GoogleAPIFactory) {
        /*jshint validthis: true */
        var vm = this;
        vm.getCoordinates = getCoordinates;
        vm.coordinates = [];
        vm.title = 'appCtrl';

        vm.fun_types = ['amusement_park', 'aquarium', 'bar', 'art_gallery', 'book_store', 'campground', 'casino', 'beauty_salon', 'florist', 'movie_rental', 'movie_theater', 'museum', 'night_club', 'park', 'restaurant', 'shopping_mall', 'spa', 'stadium', 'zoo'];
        vm.serious_types = ['airport', 'atm', 'bank', 'car_repair', 'city_hall', 'courthouse', 'dentist', 'doctor', 'electrician', 'embassy', 'fire_station', 'gas_station', 'grocery_or_supermarket', 'gym', 'hardware_store', 'hospital', 'laundry', 'lawyer', 'library', 'locksmith', 'local_government_office', 'lodging', 'painter', 'parking', 'pharmacy', 'plumber', 'police', 'post_office', 'storage', 'train_station', 'transit_station', 'veterinary_care'];

        function getCoordinates() {
            if (navigator.geolocation) {
                // window.onload = function() {
                var startPos;
                var geoSuccess = function(position) {
                    startPos = position;
                    vm.coordinates.push(parseFloat(startPos.coords.latitude));
                    vm.coordinates.push(parseFloat(startPos.coords.longitude));
                    GoogleAPIFactory.initMap(vm.coordinates);

                };
                navigator.geolocation.getCurrentPosition(geoSuccess);
                // };

            } else {
                // toastr.error("Your location can't be found via the browser. Please type in your address.");
                console.log("Your location can't be found via the browser. Please type in your address.")
            }
        }
    }
})();

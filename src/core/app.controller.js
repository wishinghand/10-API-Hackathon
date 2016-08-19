(function() {
    'use strict';

    angular
        .module('app')
        .controller('appCtrl', appCtrl);

    appCtrl.$inject = ['GoogleAPIFactory', 'uiGmapGoogleMapApi'];

    /* @ngInject */
    function appCtrl(GoogleAPIFactory, uiGmapGoogleMapApi) {
        /*jshint validthis: true */
        var vm = this;

        vm.loading = true;
        //this function sets the map on page load

        vm.setMap = setMap;
        //this function is run when user searches for their address
        // vm.getMap = getMap;
        vm.coordinates = [];
        vm.title = 'appCtrl';
        vm.shuffleHeadings = shuffleHeadings;

        // new config object, defaulted to san diego coordinates.
        vm.map = { center: { latitude: -32.7157, longitude: 117.1611 }, zoom: 15 };

        vm.fun_types = ['amusement_park', 'aquarium', 'bar', 'art_gallery', 'book_store', 'campground', 'casino', 'beauty_salon', 'florist', 'movie_rental', 'movie_theater', 'museum', 'night_club', 'park', 'restaurant', 'shopping_mall', 'spa', 'stadium', 'zoo'];
        vm.serious_types = ['airport', 'atm', 'bank', 'car_repair', 'city_hall', 'courthouse', 'dentist', 'doctor', 'electrician', 'embassy', 'fire_station', 'gas_station', 'grocery_or_supermarket', 'gym', 'hardware_store', 'hospital', 'laundry', 'lawyer', 'library', 'locksmith', 'local_government_office', 'lodging', 'painter', 'parking', 'pharmacy', 'plumber', 'police', 'post_office', 'storage', 'train_station', 'transit_station', 'veterinary_care'];

        vm.headings = [
            "Happy Day that ends in 'Y'!",
            "So What's Good Around Here?",
            "What's up brah?",
            "Where my neighbors at?",
            "Let's get rekt",
            "Find something to do with your friends",
            "City Vibes",
            "Where's them good eats?"
        ];

        vm.loading = true;
        //this function sets the map on page load
        vm.setMap = setMap;
        //this function is run when user searches for their address
        // vm.getMap = getMap;
        vm.coordinates = [];
        vm.title = 'appCtrl';
        vm.shuffleHeadings = shuffleHeadings;
        vm.headingText = shuffleHeadings();

        function setMap() {
            if (navigator.geolocation) {
                var startPos;
                var geoSuccess = function(position) {
                    startPos = position;
                    vm.coordinates.push(parseFloat(startPos.coords.latitude));
                    vm.coordinates.push(parseFloat(startPos.coords.longitude));
                    GoogleAPIFactory.setMapCenter(vm.coordinates);
                    vm.loading = false;
                };
                navigator.geolocation.getCurrentPosition(geoSuccess);

            } else {
                // toastr.error("Your location can't be found via the browser. Please type in your address.");
                console.log("Your location can't be found via the browser. Please type in your address.")
            }
        }

        function shuffleHeadings() {
            var i = Math.floor((Math.random() * vm.headings.length));
            return vm.headings[i];
        }

        uiGmapGoogleMapApi.then(function(maps) {
            
        });
    }
})();

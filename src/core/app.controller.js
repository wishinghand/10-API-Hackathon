(function() {
    'use strict';

    angular
        .module('app')
        .controller('appCtrl', appCtrl);

    appCtrl.$inject = ['GoogleAPIFactory', 'uiGmapGoogleMapApi', 'uiGmapIsReady'];

    /* @ngInject */
    function appCtrl(GoogleAPIFactory, uiGmapGoogleMapApi, uiGmapIsReady) {
        /*jshint validthis: true */
        var vm = this;

        vm.loading = true;
        //this function sets the map on page load
        vm.setMap = setMap;
        vm.coordinates = [];
        //ng-model from selectboxes
        vm.typeInput;
        vm.map = {
            //default view of map
            center: { latitude: 32.7157, longitude: -117.1611 },
            zoom: 15,
            options: {
                styles: [{
                    stylers: [{ visibility: 'simplified' }]
                }, {
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }]
                }],
                scrollwheel: false
            }
        };
        vm.title = 'appCtrl';
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
        vm.headingText = shuffleHeadings();

        // new config object, defaulted to san diego coordinates.


        function setMap() {
            if (navigator.geolocation) {
                var startPos;
                var geoSuccess = function(position) {
                    startPos = position;
                    vm.coordinates.push(parseFloat(startPos.coords.latitude));
                    vm.coordinates.push(parseFloat(startPos.coords.longitude));
                    //factory function call
                    GoogleAPIFactory.setMapCenter(vm.coordinates);
                    //vm.loading = false;
                };
                navigator.geolocation.getCurrentPosition(geoSuccess);

            } else {
                console.log("Your location can't be found via the browser. Please type in your address.")
            }
        }

        function shuffleHeadings() {
            var i = Math.floor((Math.random() * vm.headings.length));
            return vm.headings[i];
        }

        // for some reason, the GMap will only load properly
        // when vm.loading is set to false in this specifc callback
        uiGmapGoogleMapApi.then(function(maps) {
            vm.loading = false;
        });

        // this promise will resolve when the actual google maps
        // instance (on the page) is ready
        uiGmapIsReady.promise(1).then(function(instances) {
            instances.forEach(function(inst) {
                // give the map instance to the API factory
                GoogleAPIFactory.setMap(inst.map);
                setMap();
                //vm.loading = false;
            });
        });
    }
})();

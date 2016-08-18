(function() {
    'use strict';

    angular
        .module('app')
        .factory('GoogleAPIFactory', GoogleAPIFactory);

    GoogleAPIFactory.$inject = ['$q'];

    /* @ngInject */
    function GoogleAPIFactory($q) {
        var map;
        var infoWindow;
        var service;
        var fun_types = ['amusement_park', 'aquarium', 'bar', 'art_gallery', 'book_store', 'campground', 'casino', 'beauty_salon', 'florist', 'movie_rental', 'movie_theater', 'museum', 'night_club', 'park', 'restaurant', 'shopping_mall', 'spa', 'stadium', 'zoo'];
        var serious_types = ['airport', 'atm', 'bank', 'car_repair', 'city_hall', 'courthouse', 'dentist', 'doctor', 'electrician', 'embassy', 'fire_station', 'gas_station', 'grocery_or_supermarket', 'gym', 'hardware_store', 'hospital', 'laundry', 'lawyer', 'library', 'locksmith', 'local_government_office', 'lodging', 'painter', 'parking', 'pharmacy', 'plumber', 'police', 'post_office', 'storage', 'train_station', 'transit_station', 'veterinary_care'];

        var service = {
            initMap: initMap,
            getGooglePlaces: getGooglePlaces,
            placeMarkers: placeMarkers
        };

        return service;

        ////////////////

        function initMap(){
            var defer = $q.defer();

            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: -33.867, lng: 151.206},
                zoom: 15,
                styles: [{
                    stylers: [{ visibility: 'simplified' }]
                }, {
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }]
                }]
            });

            infoWindow = new google.maps.InfoWindow();
            service = new google.maps.places.PlacesService(map);

              // The idle event is a debounced event, so we can query & listen without throwing too many requests at the server.
              map.addListener('idle', performSearch);
        }

        function getGooglePlaces() {
            var defer = $q.defer();
            //perform search
        }

        function placeMarkers(){
            //addMarkers
            var defer = $q.defer();
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app')
        .factory('GoogleAPIFactory', GoogleAPIFactory);

    GoogleAPIFactory.$inject = [];

    /* @ngInject */
    function GoogleAPIFactory() {
        var map;
        var infoWindow;
        var service;
        var fun_types = ['amusement_park', 'aquarium', 'bar', 'art_gallery', 'book_store', 'campground', 'casino', 'beauty_salon', 'florist', 'movie_rental', 'movie_theater', 'museum', 'night_club', 'park', 'restaurant', 'shopping_mall', 'spa', 'stadium', 'zoo'];
        var serious_types = ['airport', 'atm', 'bank', 'car_repair', 'city_hall', 'courthouse', 'dentist', 'doctor', 'electrician', 'embassy', 'fire_station', 'gas_station', 'grocery_or_supermarket', 'gym', 'hardware_store', 'hospital', 'laundry', 'lawyer', 'library', 'locksmith', 'local_government_office', 'lodging', 'painter', 'parking', 'pharmacy', 'plumber', 'police', 'post_office', 'storage', 'train_station', 'transit_station', 'veterinary_care'];

        var service = {
            setMapCenter: setMapCenter,
            getGooglePlaces: getGooglePlaces,
            placeMarkers: placeMarkers
        };

        return service;

        ////////////////

        function setMapCenter(coord) {
            map = new google.maps.Map(document.getElementById('map'), getMapCenter(coord));
            infoWindow = new google.maps.InfoWindow();
            service = new google.maps.places.PlacesService(map);

            // The idle event is a debounced event, so we can query & listen without throwing too many requests at the server.
            map.addListener('idle', performSearch);
        }

        function getGooglePlaces() {
            //perform search
        }

        function placeMarkers() {
            //addMarkers
        }

        function getMapCenter(coord) {
            if (coord) {
                return {
                    // investigate { lat: coord[0], lng: coord[1]}
                    center: new google.maps.LatLng(coord[0], coord[1]),
                    zoom: 15,
                    styles: [{
                        stylers: [{ visibility: 'simplified' }]
                    }, {
                        elementType: 'labels',
                        stylers: [{ visibility: 'off' }]
                    }],
                    scrollwheel: false
                };
            } else {
                return {
                    center: { lat: -32.7157, lng: 117.1611 },
                    zoom: 15,
                    styles: [{
                        stylers: [{ visibility: 'simplified' }]
                    }, {
                        elementType: 'labels',
                        stylers: [{ visibility: 'off' }]
                    }],
                    scrollwheel: false
                };
            }
        }

        function performSearch() {
            var request = {
                bounds: map.getBounds(),
                keyword: 'best view'
            };
            service.radarSearch(request, callback);
        }

        function callback(results, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                console.error(status);
                return;
            }
            for (var i = 0, result; result = results[i]; i++) {
                addMarker(result);
            }
        }

        function addMarker(place) {
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                icon: {
                    url: 'http://maps.gstatic.com/mapfiles/circle.png',
                    anchor: new google.maps.Point(10, 10),
                    scaledSize: new google.maps.Size(10, 17)
                }
            });

            google.maps.event.addListener(marker, 'click', function() {
                service.getDetails(place, function(result, status) {
                    if (status !== google.maps.places.PlacesServiceStatus.OK) {
                        console.error(status);
                        return;
                    }
                    infoWindow.setContent(result.name);
                    infoWindow.open(map, marker);
                });
            });
        }
    }
})();

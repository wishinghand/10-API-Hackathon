(function() {
    'use strict';

    angular
        .module('app')
        .factory('GoogleAPIFactory', GoogleAPIFactory);

    GoogleAPIFactory.$inject = [];

    /* @ngInject */
    function GoogleAPIFactory() {
        var map = {};
        var infoWindow;
        var service;
        var fun_types = ['amusement_park', 'aquarium', 'bar', 'art_gallery', 'book_store', 'campground', 'casino', 'beauty_salon', 'florist', 'movie_rental', 'movie_theater', 'museum', 'night_club', 'park', 'restaurant', 'shopping_mall', 'spa', 'stadium', 'zoo'];
        var serious_types = ['airport', 'atm', 'bank', 'car_repair', 'city_hall', 'courthouse', 'dentist', 'doctor', 'electrician', 'embassy', 'fire_station', 'gas_station', 'grocery_or_supermarket', 'gym', 'hardware_store', 'hospital', 'laundry', 'lawyer', 'library', 'locksmith', 'local_government_office', 'lodging', 'painter', 'parking', 'pharmacy', 'plumber', 'police', 'post_office', 'storage', 'train_station', 'transit_station', 'veterinary_care'];

        var service = {
            setMap: setMap,
            setMapCenter: setMapCenter,
            getGooglePlaces: getGooglePlaces
        };

        return service;

        ////////////////
        function setMap(mapIn) {
            console.log(mapIn);
            map = mapIn;
            infoWindow = new google.maps.InfoWindow();
            service = new google.maps.places.PlacesService(map);
        }

        function getGooglePlaces() {
            //perform search
            // performSearch();
        }

        function setMapCenter(coord) {            
            map.setCenter({lat: coord[0], lng: coord[1]});
            // The idle event is a debounced event, so we can query & listen without throwing too many requests at the server.
            //map.addListener('idle', performSearch);
        }

        // returns an array of arrays
        // representing a split into n chunks
        function splitInNChunks(a, n) {
            var chunkSize = Math.floor(a.length / n);
            var chunkStart = 0;
            var chunkEnd = chunkStart + chunkSize;
            var out = [];
            var temp;
            for(var i = 0; i < n; i++) {
                temp = [];
                for(var j = chunkStart; j < chunkEnd; j++) {
                    temp[j - chunkStart] = a[j];
                }
                if(i === n - 1 && a % n !== 0) {
                    temp[chunkEnd - chunkStart] = a[chunkEnd];
                }
                out.push(temp);
                chunkStart += chunkSize;
                chunkEnd += chunkSize;
            }

            return out;
        }

        function performSearch() {
            var searchTypes = getTypesToSearch();
            var requestGroups = splitInNChunks(searchTypes, 10);
            console.log(requestGroups);
            for(var i = 0; i < requestGroups.length; i++) {
                var request = {
                    bounds: map.getBounds(),
                    types: requestGroups[i]
                };
                // var request = {
                //     location: {
                //         lat: map.center.lat(),
                //         lng: map.center.lng()
                //     },
                //     radius: 50000,
                //     types: requestGroups[i]
                // };
                service.radarSearch(request, callback);
            }
                
        }

        // TODO: look at checkboxes to see what the user
        // wants to search
        function getTypesToSearch() {
            return fun_types.concat(serious_types);
        }

        function callback(results, status) {
            console.log(results);
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

    // function getMapCenter(coord) {
        //     if (coord) {
        //         return {
        //             // investigate { lat: coord[0], lng: coord[1]}
        //             center: new google.maps.LatLng(coord[0], coord[1]),
        //             zoom: 15,
        //             styles: [{
        //                 stylers: [{ visibility: 'simplified' }]
        //             }, {
        //                 elementType: 'labels',
        //                 stylers: [{ visibility: 'off' }]
        //             }],
        //             scrollwheel: false
        //         };
        //     } else {
        //         return {
        //             center: { lat: -32.7157, lng: 117.1611 },
        //             zoom: 15,
        //             styles: [{
        //                 stylers: [{ visibility: 'simplified' }]
        //             }, {
        //                 elementType: 'labels',
        //                 stylers: [{ visibility: 'off' }]
        //             }],
        //             scrollwheel: false
        //         };
        //     }
        // }
})();


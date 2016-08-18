(function() {
    'use strict';

    angular
        .module('app')
        .value('coord', function(){
            if (navigator.geolocation) {
                window.onload = function() {
                    var startPos;
                    var geoSuccess = function(position) {
                    startPos = position;
                    var coordArray = [];
                    coordArray.push(startPos.coords.latitude);
                    coordArray.push(startPos.coords.longitude);
                    console.log(coordArray);
                };
                navigator.geolocation.getCurrentPosition(geoSuccess);
                };

                return coordArray;
            }
            else {
              toastr.error("Your location can't be found via the browser. Please type in your address.");
            }
        });
})();
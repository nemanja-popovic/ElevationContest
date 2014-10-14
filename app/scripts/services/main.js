'use strict';
angular.module('elevationContestApp')
    .service('mainService', function ($http, $q) {
        var service = {};
        var topTenData;

        service.getTopTenList = function () {
            var promise = $http.get('data/topten.json').success(function (data) {
                topTenData = data;
                return data;
            });
            return promise;
        };

        service.getElevationRank = function (height) {
            if (height > topTenData[topTenData.length - 1].elevation) {
                //Find position
                var position = 1;

                return position;
            }
            else {
                return -1;
            }
        };

        service.getLocation = function () {

            var deferred = new $q.defer();

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    //return  this.getElevation(position.location);
                    deferred.resolve(position);
                });
            }
            else {
                //Show message that the location cant be returned
                return null;
            }

            return deferred.promise;
        };

        service.getElevation = function () {
            var deferred = new $q.defer();

            //Get location
            var location = this.getLocation();
            location.then(function (position) {

                //Greate googles object for position
                var latLang = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                var elevator = new window.google.maps.ElevationService();
                var locations = [];
                locations.push(latLang);
                var positionalRequest = {
                    'locations': locations
                };


                // Initiate the location request
                elevator.getElevationForLocations(positionalRequest, function (results, status) {
                    if (status === window.google.maps.ElevationStatus.OK) {

                        // Retrieve the first result
                        var elevation = results[0].elevation;

                        //Create custom object
                        var returnObject = {
                            lat: position.coords.latitude,
                            lon: position.coords.longitude,
                            height: elevation
                        };
                        deferred.resolve(returnObject);
                    }
                });

            });
            return deferred.promise;
        };

        return service;
    });
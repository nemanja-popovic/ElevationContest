﻿'use strict';
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

        service.saveTopTenList = function () {
            $http.post('data/topten.json', topTenData).then(function () {

            });
        };

        service.updateTopTenList = function (newItem) {

            console.log(newItem);

            var position = newItem.position;
            if (topTenData) {

                topTenData.splice(position, 0, newItem);
            }
            else {
                topTenData = [];
                topTenData[0] = newItem;
            }
            //  service.saveTopTenList();

            return topTenData;
        };

        service.getElevationRank = function (height) {
            var position = 0;
            if (topTenData.length < 10) {


                while (topTenData.length > position && topTenData[position].elevation > height) {
                    position++;
                }

                return position;
            }
            else {
                if (height > topTenData[topTenData.length - 1].elevation) {
                    //Find position
                    position = 0;

                    while (topTenData[position].elevation > height) {
                        position++;
                    }

                    return position;
                }
                else {
                    return -1;
                }
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
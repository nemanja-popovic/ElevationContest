'use strict';
angular.module('elevationContestApp')
    .service('mainService', function ($http, $q) {
        var service = {};

        service.getTopTenList = function () {
            var promise = $http.get('data/topten.json').success(function (data) {
                console.log(data);
                return data;
            });
            return promise;
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
                console.log(position);


                var url = 'https://maps.googleapis.com/maps/api/elevation/json?locations=' + position.coords.latitude + ',' + position.coords.longitude;
                var promise = $http.get(url).success(function (data) {
                   
                    deferred.resolve(data);
                });
                return promise;
            });
            return deferred.promise;
        };

        return service;
    });
'use strict';

/**
 * @ngdoc function
 * @name elevationContestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the elevationContestApp
 */
angular.module('elevationContestApp')
   .config(['GoogleMapApiProvider'.ns(), function (GoogleMapApi) {
       GoogleMapApi.configure({
           //    key: 'your api key',
           v: '3.17',
           libraries: 'weather,geometry,visualization'
       });
   }]);

angular.module('elevationContestApp')
  .controller('MainCtrl', ['mainService', '$scope', 'GoogleMapApi'.ns(), function (mainService, $scope, GoogleMapApi) {

      GoogleMapApi.then(function (maps) {

      });

      $scope.map = {
          center: {
              latitude: 0,
              longitude: 0
          },
          zoom: 1
      };

      $scope.getElevationData = function () {
          mainService.getElevation().then(function (data) {
              var currentData = data;

              var rank = mainService.getElevationRank(currentData.height);
              if (rank > 0) {

                 
                  //Show that the user made top 10 and ask for his name



                  //Update scope
                  $scope.topten = service.updateTopTenList(currentData);

              }
              else {
                  //Message that this time didn't made top 10
              }
          });

      };

      $scope.showOnMap = function (user) {

      };

      $scope.events = {
          mouseover: function (marker, eventName, args) {
              $scope.shownElevation = args.idKey;
              console.log($scope.shownElevation);
          },
          mouseout: function () {
              $scope.shownElevation = 0;
          }
      };

      $scope.shownElevation = 0;

      mainService.getTopTenList().success(function (data) {
          $scope.topten = data;

      });

  }]);

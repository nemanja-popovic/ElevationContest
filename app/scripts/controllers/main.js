'use strict';

angular.module('elevationContestApp')
  .config(['GoogleMapApiProvider'.ns(), function (GoogleMapApi) {
      GoogleMapApi.configure({
          //    key: 'your api key',
          v: '3.17',
          libraries: 'weather,geometry,visualization'
      });

  }]);

angular.module('elevationContestApp')
  .controller('MainCtrl', ['mainService', '$scope', '$modal', function (mainService, $scope, $modal) {

      $scope.map = {
          center: {
              latitude: 0,
              longitude: 0
          },
          zoom: 1
      };

      $scope.getElevationData = function () {

          //Loading animation
          $scope.showLoader = true;

          //Show that the user made top 10 and ask for his name
          mainService.getElevation().then(function (data) {
              var currentData = data;

              console.log(currentData);

              $scope.showLoader = false;

              var rank = mainService.getElevationRank(currentData.height);
              console.log(rank);
              if (rank > 0) {
                  $modal.open({
                      templateUrl: 'views/templates/sucess.html',
                      backdrop: true,
                      windowClass: 'modal',
                      controller: function ($scope, $modalInstance, $log, user) {
                          $scope.user = user;
                          $scope.add = function () {

                              console.log($scope.user);

                              $modalInstance.dismiss('cancel');

                              var newItem = {
                                  'position': rank + 1,
                                  'name': $scope.user.name,
                                  'elevation': currentData.height,
                                  'coords': {
                                      'latitude': currentData.lat,
                                      'longitude': currentData.lon
                                  }
                              };
                              //Update scope
                              $scope.topten = mainService.updateTopTenList(newItem);
                              console.log($scope.topten);
                          };
                          $scope.cancel = function () {
                              $modalInstance.dismiss('cancel');
                          };
                      },
                      resolve: {
                          user: function () {
                              return $scope.user;
                          }
                      }
                  });

              }
              else {
                  //Message that this time didn't made top 10
                  $modal.open({
                      templateUrl: 'views/templates/fail.html',
                      backdrop: true,
                      windowClass: 'modal',
                      controller: function ($scope, $modalInstance) {
                          $scope.ok = function () {
                              $modalInstance.dismiss('cancel');
                          };
                      }
                  });
              }
          });

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
      $scope.showNameField = false;
      $scope.showLoader = false;

      mainService.getTopTenList().success(function (data) {
          $scope.topten = data;

      });

  }]);

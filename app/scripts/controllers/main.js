'use strict';

/**
 * @ngdoc function
 * @name elevationContestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the elevationContestApp
 */
angular.module('elevationContestApp')
  .controller('MainCtrl', ['mainService', '$scope', function (mainService, $scope) {
      mainService.getTopTenList().success(function (data) {
          $scope.topten = data;

          $scope.getElevationData = function () {
              mainService.getElevation().then(function (data) {
                  console.log(data);
              });
              
          };
      });

  }]);

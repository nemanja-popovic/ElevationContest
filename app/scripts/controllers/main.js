'use strict';

/**
 * @ngdoc function
 * @name elevationContestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the elevationContestApp
 */
angular.module('elevationContestApp')
  .controller('MainCtrl', function ($scope, $http) {
      $http.get('data/topten.json').success(function (data) {
          console.log(data);
          $scope.topten = data;
      });
  });

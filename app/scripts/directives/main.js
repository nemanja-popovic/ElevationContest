'use strict';
angular.module('elevationContestApp')
    .directive('ecTopList', function () {
        return {
            restrict: 'E',
            scope: {
                topten: '=info',
                shownElevation: '=index'
            },
            templateUrl: 'views/templates/top-list.html',
        };
    })
    .directive('ecGetElevation', function () {
        return {
            restrict: 'E',
            link: function (scope) {
                scope.getElevation = function () {
                    scope.getElevationData();
                };
               
            },
            template: '<button class="btn btn-primary" ng-click="getElevation()">Get my elevation!</button>',
        };
    });
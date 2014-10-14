'use strict';
angular.module('elevationContestApp')
    .directive('loadingAnimation', function () {
        return {
            restrict: 'E',
            scope: {
                showLoader: '=showLoader'
            },
            templateUrl: 'views/templates/loader.html',
        };
    });
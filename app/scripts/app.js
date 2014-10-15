'use strict';

angular
  .module('elevationContestApp', ['ngRoute', 'google-maps'.ns(), 'ui.bootstrap'])
         .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
             $locationProvider.html5Mode(true);

             $routeProvider
                 .when('/', {
                     templateUrl: '/views/main.html',
                     controller: 'MainCtrl'
                 })
                 .when('/about', {
                     templateUrl: '/views/about.html',
                     controller: 'AboutCtrl'
                 })
                 .otherwise({
                     redirectTo: '/'
                 });
         }]);

'use strict';

var app = angular.module('Scrbbl', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap']);

app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl: 'public/views/home.html',
                controller: 'MainCtrl'
            })
            .when('/manual', {
                templateUrl: 'public/views/manual.html',
                controller: 'ManualCtrl'
            })
            .when('/scrobblealbum', {
                templateUrl: 'public/views/scrobblealbum.html',
                controller: 'ScrobbleAlbumCtrl'
            })
            .when('/scrobbleradio', {
                templateUrl: 'public/views/scrobbleradio.html',
                controller: 'RadioCtrl'
            })
            .when('/scrobbleuser', {
                templateUrl: 'public/views/scrobbleuser.html',
                controller: 'ScrobbleUserCtrl'
            })
            .when('/charts', {
                templateUrl: 'public/views/charts.html',
                controller: 'ChartCtrl'
            })
            .when('/fun', {
                templateUrl: 'public/views/fun.html',
                controller: 'FunCtrl'
            })
            .when('/404', {
                templateUrl: 'public/views/404.html'
            })
            .otherwise({
                redirectTo: '/404'
            });
    }]);
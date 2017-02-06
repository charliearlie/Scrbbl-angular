angular.module('Scrbbl', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap'])
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
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
            .otherwise({
                redirectTo: '/'
            });
    }]);
angular.module('Scrbbl')
    .controller('MainCtrl', ['$scope', '$alert', 'Authenticate', '$location', 'Scrobble',
    function($scope, $alert, Authenticate, $location, Scrobble) {
        $scope.track = {};
    }]);
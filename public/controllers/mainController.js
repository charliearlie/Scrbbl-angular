angular.module('Scrbbl')
    .controller('MainCtrl', ['$scope', '$alert', 'Authenticate', '$location', 'Scrobble',
    function($scope, $alert, Authenticate, $location, Scrobble) {
        $scope.track = {};
        $scope.track.songTitle = "Test song title";
        $scope.test = "egg";
        $scope.test2 = "Manual";
        $scope.scrobble = function() {
            Scrobble.scrobbleTrack($scope.track);
        };
    }]);
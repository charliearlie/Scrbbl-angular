angular.module('Scrbbl')
    .controller('ManualCtrl', ['$scope', '$alert', 'Authenticate', '$location', 'Scrobble',
    function($scope, $alert, Authenticate, $location, Scrobble) {
        $scope.track = {};
        $scope.track.songTitle = "Redbone";
        $scope.track.songArtist = "Childish Gambino";
        $scope.test = "egg";
        $scope.test2 = "Manual";
        $scope.scrobble = function() {
            Scrobble.scrobbleTrack($scope.track).then(function(data) {
                $scope.success = data;
            });
        };
    }]);
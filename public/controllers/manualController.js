angular.module('Scrbbl')
    .controller('ManualCtrl', ['$scope', '$alert', 'Authenticate', '$location', 'Scrobble',
    function($scope, $alert, Authenticate, $location, Scrobble) {
        $scope.track = {};
        $scope.success = false;
        $scope.scrobble = function() {
            $scope.loading = true;
            Scrobble.scrobbleTrack($scope.track).then(function(data) {
                $scope.success = data;
                $scope.loading = false;
            });
        };

        $scope.refreshForm = function() {
            $scope.success = false;
            $scope.track = {};

        };

        $scope.$watch('track.artist', function() {
            console.log($scope.track);
        });
    }]);
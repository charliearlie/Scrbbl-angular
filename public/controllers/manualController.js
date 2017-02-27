angular.module('Scrbbl')
    .controller('ManualCtrl', ['$scope', '$alert', 'Authenticate', '$location', 'Scrobble', 'UserPersistence',
        function ($scope, $alert, Authenticate, $location, Scrobble, UserPersistence) {
            if (UserPersistence.getCookieData()) {
                Scrobble.getUserTopArtists()
                    .then(function (topArtists) {
                        Scrobble.topArtists = topArtists;
                     });
            }
            

            $scope.track = {};
            $scope.success = false;
            $scope.scrobble = function () {
                $scope.loading = true;
                $scope.track.user = UserPersistence.getCookieData();
                Scrobble.scrobbleTrack($scope.track).then(function (data) {
                    $scope.success = data;
                    $scope.loading = false;
                });
            };

            $scope.refreshForm = function () {
                $scope.success = false;
                $scope.track = {};

            };

            $scope.$watch('track.songArtist', _.debounce(function (artist, newVal) {
                $scope.$apply(function () {
                    if (artist !== undefined) {
                        // $scope.artistScrobbles = _.find($scope.topArtists, function(a) {
                        //     return a.name.toLowerCase() === artist.toLowerCase();
                        // });
                        
                        $scope.artistScrobbles = _.result(_.find(Scrobble.topArtists, function(a) {
                            return a.name.toLowerCase() === artist.toLowerCase();
                        }), 'playcount');

                            console.log($scope.artistScrobbles);
                    }

                });
            }, 1000), true);
        }]);
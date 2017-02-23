angular.module('Scrbbl')
    .controller('ScrobbleAlbumCtrl', ['$scope', '$alert', 'Authenticate', '$location', 'Scrobble', 'UserPersistence',
    'Track',
    function($scope, $alert, Authenticate, $location, Scrobble, UserPersistence, Track) {
        $scope.album = {};
        $scope.selectedAlbum = null;
        $scope.search = function() {
            Scrobble.searchAlbum($scope.album)
                .then(function(results) {
                    $scope.results = results;
                });
        };

        $scope.refreshForm = function() {
            $scope.success = false;
            $scope.track = {};

        };

        $scope.selectResult = function(album) {
            $scope.selectedAlbum = album;
            Track.getAlbumTracks(album.collectionId)
                .then(function(tracks) {
                    $scope.album.tracks = tracks;
                });

        }

        $scope.scrobbleAlbum = function() {
            $scope.album.user = UserPersistence.getCookieData();
            Scrobble.scrobbleAlbum($scope.album).then(function(result) {
                $scope.success = result;
                $scope.loading = false;
                $scope.results = {};
                $scope.selectedAlbum = {};
                $scope.album = {};
            });
        }
    }]);
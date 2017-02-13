angular.module('Scrbbl')
    .controller('ScrobbleAlbumCtrl', ['$scope', '$alert', 'Authenticate', '$location', 'Scrobble',
    function($scope, $alert, Authenticate, $location, Scrobble) {
        $scope.album = {};
        $scope.scrobble = function() {
            Scrobble.searchAlbum($scope.album).then(function(result) {
                $scope.results = _.map(result.data, function(result) {
                    return {
                        title: result.name,
                        artist: result.artist,
                        mbid: result.mbid
                    };
                });
            });
        };

        $scope.refreshForm = function() {
            $scope.success = false;
            $scope.track = {};

        };

        $scope.selectResult = function(title, artist) {
            $scope.album.title = title;
            $scope.album.artist = artist;

            Scrobble.scrobbleAlbum($scope.album).then(function(result) {
                $scope.success = result;
                $scope.loading = false;
                $scope.results = {};
                $scope.album = {};
            });
        }
    }]);
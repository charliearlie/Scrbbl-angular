angular.module('Scrbbl')
    .controller('ScrobbleAlbumCtrl', ['$scope', '$alert', 'Authenticate', '$location', 'Scrobble',
    function($scope, $alert, Authenticate, $location, Scrobble) {
        $scope.album = {};
        $scope.selectedAlbum = null;
        $scope.search = function() {
            Scrobble.searchAlbum($scope.album).then(function(result) {
                $scope.results = _.map(result.data.results, function(result) {
                    return {
                        title: result.collectionName,
                        artist: result.artistName,
                        collectionId: result.collectionId,
                        imageUrl: result.artworkUrl60
                    };
                });
            });
        };

        $scope.refreshForm = function() {
            $scope.success = false;
            $scope.track = {};

        };

        $scope.selectResult = function(album) {
            $scope.selectedAlbum = album;

        }

        $scope.scrobbleAlbum = function() {
            Scrobble.scrobbleAlbum($scope.selectedAlbum).then(function(result) {
                $scope.success = result;
                $scope.loading = false;
                $scope.results = {};
                $scope.selectedAlbum = {};
            });
        }
    }]);
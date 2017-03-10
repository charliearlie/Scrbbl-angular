(function () {
    app.controller('ScrobbleUserCtrl', ['$scope', 'LastfmUser', 'Scrobble', 
    function($scope, LastfmUser, Scrobble) {
        $scope.lastfmuser = {};
        $scope.searchUser = function() {
            LastfmUser.getUserData($scope.lastfmuser.name)
                .then(function(tracks) {
                    $scope.results = _.map(tracks, function (track) {
                            return {
                                title: track.name,
                                artist: track.artist['#text'],
                                date: track.date ? track.date['#text'] : '',
                                album: track.album ? track.album['#text'] : ''

                            };
                        });
                })
                .catch(function(error) {

                });
        }

        $scope.scrobbleSelected = function () {
                var selected = {};
                selected.tracks = _.chain($scope.results)
                    .filter(function (track) {
                        return track.toScrobble;
                    })
                    .map(function (track) {
                        return {
                            artistName: track.artist,
                            trackCensoredName: track.title,
                            date: track.date,
                            collectionName: track.album
                        }
                    })
                    .value();

                Scrobble.scrobbleAlbum(selected)
                    .then(function (result) {
                        $scope.success = result;
                        $scope.loading = false;
                        $scope.results = null;
                        $scope.selectedAlbum = {};
                        $scope.album = {}; //Sort all this
                    });
            }

        $scope.$watch('lastfmuser.name', _.debounce(function (user, newVal) {
                $scope.$apply(function () {
                    console.log($scope.lastfmuser.name);

                });
            }, 1000), true);
    }]);

} ());
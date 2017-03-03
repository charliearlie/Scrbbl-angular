(function () {
    app.controller('ScrobbleUserCtrl', ['$scope', 'LastfmUser', scrobbleUserController]);

    function scrobbleUserController($scope, LastfmUser) {
        $scope.lastfmUser = '';

        $scope.searchUser = function() {
            LastfmUser.getUserData($scope.lastfmUser)
                .then(function(result) {
                    $scope.results = _.map(tracks, function (track) {
                            return {
                                title: track.name,
                                artist: track.artist['#text'],
                                date: track.date ? track.date['#text'] : ' '

                            };
                        });
                })
                .catch(function(error) {

                });
        }
    }

} ());
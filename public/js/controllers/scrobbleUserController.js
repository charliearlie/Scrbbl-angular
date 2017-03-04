(function () {
    app.controller('ScrobbleUserCtrl', ['$scope', 'LastfmUser', 
    function($scope, LastfmUser) {
        $scope.lastfmuser = {};
        $scope.searchUser = function() {
            LastfmUser.getUserData($scope.lastfmuser.name)
                .then(function(tracks) {
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

        $scope.$watch('userToSearch', _.debounce(function (user, newVal) {
                $scope.$apply(function () {
                    console.log($scope.userToSearch);

                });
            }, 1000), true);
    }]);

} ());
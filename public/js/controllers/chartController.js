app.controller('ChartCtrl', ['$scope', 'LastfmUser', chartController]);

function chartController($scope, LastfmUser) {
    getTopArtists()

    function getTopArtists() {
        LastfmUser.getTopArtists()
            .then(function(result) {
                $scope.topArtists = result.topartists.artist;
                console.log($scope.topArtists);
            })
    }
    
}
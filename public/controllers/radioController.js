angular.module('Scrbbl')
.controller('RadioCtrl', ['$scope', '$alert', 'Authenticate', '$location', 'Scrobble', 'Radio', RadioController]);

    function RadioController($scope, $alert, Authenticate, $location, Scrobble, Radio) {
        $scope.stations = [
            {
                "station": "Radio 1",
                "lastfmName": "bbcradio1"
            },
            {
                "station": "Radio 2",
                "lastfmName": "bbcradio2"
            },
            {
                "station": "Radio 3",
                "lastfmName": "bbcradio3"
            },
            {
                "station": "Radio 1xtra",
                "lastfmName": "bbc1xtra"
            }
        ];

        $scope.getStationPlays = function() {
            Radio.getStationPlays($scope.selectedStation).then(function(result) {
                var tracks = result.data.recenttracks.track;
                $scope.results = _.map(tracks, (track) => {
                    return {
                        title: track.name,
                        artist: track.artist['#text'],
                        date: track.date ? track.date['#text'] : ' '

                    };
                });
            });
        }

        $scope.scrobbleSelected = function() {
            let selected = _.filter($scope.results, (track) => {
                return track.toScrobble;
            });

            console.log(selected);
        }
        
    }
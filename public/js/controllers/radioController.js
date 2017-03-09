'use strict';

(function () {
    app.controller('RadioCtrl', ['$scope', '$alert', 'Authenticate', '$location', 'Scrobble', 'Radio',
        function ($scope, $alert, Authenticate, $location, Scrobble, Radio) {
            $scope.search = {};
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

            $scope.getStationPlays = function () {
                Radio.getStationPlays($scope.search.selectedStation)
                    .then(function (tracks) {
                        $scope.results = _.map(tracks, function (track) {
                            return {
                                title: track.name,
                                artist: track.artist['#text'],
                                date: track.date ? track.date['#text'] : ' '

                            };
                        });
                    })
                    .catch(function (error) {
                        console.log('Error message: ' + error);
                    })
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
                            date: track.date
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

            $scope.refreshForm = function () {
                $scope.success = false;
                $scope.search = {};

            };

        }]);
} ());
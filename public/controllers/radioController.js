angular.module('Scrbbl')
    .controller('RadioCtrl', ['$scope', '$alert', 'Authenticate', '$location', 'Scrobble',
    function($scope, $alert, Authenticate, $location, Scrobble) {
        $scope.stations = [
            {
                "key": 1,
                "station": "Radio 1"
            },
            {
                "key": 2,
                "station": "Radio 2"
            },
            {
                "key": 3,
                "station": "Radio 3"
            },
            {
                "key": 4,
                "station": "1Xtra"
            }
        ]
        
    }]);
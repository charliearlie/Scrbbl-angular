angular.module('Scrbbl')
    .controller('MainCtrl', ['$scope', '$alert', 'Authenticate', '$location', 'Scrobble', 'UserPersistence',
    function($scope, $alert, Authenticate, $location, Scrobble, UserPersistence) {
        $scope.track = {};
    }]);
angular.module('Scrbbl')
    .controller('MainCtrl', ['$scope', '$alert', 'Authenticate', '$location', '$cookies' ,'UserPersistence',
    function($scope, $alert, Authenticate, $location, $cookies, UserPersistence) {
        $scope.showFirstVisitMessage = !$cookies.visited;
        $cookies.visited = 'yes';
    }]);
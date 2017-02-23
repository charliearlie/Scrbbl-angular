angular.module('Scrbbl')
    .controller('MainCtrl', ['$scope', '$alert', 'Authenticate', '$location', '$cookies' ,'UserPersistence', MainController]);
    
    function MainController($scope, $alert, Authenticate, $location, $cookies, UserPersistence) {
        $scope.showFirstVisitMessage = !$cookies.visited;
        $cookies.visited = 'yes';
    }
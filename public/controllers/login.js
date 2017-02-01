angular.module('Scrbbl')
    .controller('LoginCtrl', ['$scope', '$alert', 'Authenticate', '$location', 
    function($scope, $alert, Authenticate, $location) {
        var user = null;
        var param = $location.search().token;
        if (param && param != 'undefined') {
            Authenticate.createSession(param).then(function(result) {
                $scope.user = result.data.username;
            });;
        }
        
        $scope.authenticate = function() {
            console.log("clicked");
            Authenticate.login();
        };
    }]);
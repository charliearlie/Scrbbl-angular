angular.module('Scrbbl')
    .controller('LoginCtrl', ['$scope', '$alert', 'Authenticate', '$location', 'UserPersistence', 
    function($scope, $alert, Authenticate, $location, UserPersistence) {
        if (UserPersistence.getCookieData()) {
            $scope.user = UserPersistence.getCookieData();
        }
        var param = $location.search().token;
        if (param && param != 'undefined') {
            Authenticate.createSession(param).then(function(result) {
                $scope.user = result.data.username;
                UserPersistence.setCookieData($scope.user);
            });;
        }
        
        $scope.authenticate = function() {
            console.log("clicked");
            Authenticate.login();
        };

        $scope.logout = function() {
            UserPersistence.clearCookieData();
            location.reload();
        }
    }]);
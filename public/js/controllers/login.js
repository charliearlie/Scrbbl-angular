'use strict';

(function () {
    app.controller('LoginCtrl', ['$scope', '$alert', 'Authenticate', '$location', 'UserPersistence',
        function ($scope, $alert, Authenticate, $location, UserPersistence) {
            if (UserPersistence.getCookieData()) {
                $scope.user = UserPersistence.getCookieData();
            }
            var param = $location.search().token;
            if (param && param != 'undefined' && !UserPersistence.getCookieData()) {
                Authenticate.createSession(param).then(function (result) {
                    $scope.user = {};
                    $scope.user.userName = result.data.username;
                    $scope.user.key = result.data.key;
                    UserPersistence.setCookieData($scope.user);
                });;
            }

            console.log($scope.user);

            $scope.authenticate = function () {
                console.log("clicked");
                Authenticate.login();
            };

            $scope.logout = function () {
                UserPersistence.clearCookieData();
                location.reload();
            }
        }]);

} ());
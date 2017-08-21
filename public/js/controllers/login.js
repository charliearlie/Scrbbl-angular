'use strict';

(function () {
    app.controller('LoginCtrl', ['$scope', '$alert', 'LastfmUser', '$location', 'UserPersistence',
        function ($scope, $alert, LastfmUser, $location, UserPersistence) {
            if (UserPersistence.getCookieData()) {
                $scope.user = UserPersistence.getCookieData();
            }
            var param = $location.search().token;
            if (param && param != 'undefined' && !UserPersistence.getCookieData()) {
                LastfmUser.createSession(param).then(function (result) {
                    $scope.user = {};
                    $scope.user.userName = result.data.username;
                    $scope.user.key = result.data.key;
                    UserPersistence.setCookieData($scope.user);
                });;
            }

            console.log($scope.user);

            $scope.authenticate = function () {
                console.log("clicked");
                LastfmUser.login();
            };

            $scope.logout = function () {
                UserPersistence.clearCookieData();
                location.reload();
            }
        }]);

} ());
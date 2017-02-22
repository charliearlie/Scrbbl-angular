(function () {
    angular.module('Scrbbl')
        .factory('UserPersistence', ['$cookies', function ($cookies) {
            var userName = "";
            var key = "";

            return {
                setCookieData: setCookieData,
                getCookieData: getCookieData,
                clearCookieData: clearCookieData,
                getCookieKey: getCookieKey
            };
            
            function setCookieData(user) {
                userName = user.username;
                key = user.key;
                $cookies.put("userName", userName);
                $cookies.put("key", key);
            }

            function getCookieData() {
                var user = {};
                user.userName = $cookies.get("userName");
                user.key = $cookies.get("key");
                if (user.userName) {
                    return user;
                } else {
                    return null;
                }
            }
            function clearCookieData() {
                userName = "";
                key = "";
                $cookies.remove("userName");
                $cookies.remove("key");
            }
            function getCookieKey() {
                var key = null;
                if ($cookies.get("key")) {
                    key = $cookies.get("key");
                }
                return key;
            }
        }]);
} ());
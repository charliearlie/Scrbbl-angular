'use strict';

(function () {
    app.factory('UserPersistence', ['$cookies', function ($cookies) {
        var userName = "";
        var key = "";

        return {
            setCookieData: setCookieData,
            getCookieData: getCookieData,
            clearCookieData: clearCookieData,
            getCookieKey: getCookieKey
        };

        function setCookieData(user) {
            userName = user.userName;
            key = user.key;
            $cookies.put("userName", userName);
            $cookies.put("key", key);
        }

        function getCookieData() {
            var user = {};
            user.userName = $cookies.get("userName");
            user.key = $cookies.get("key");
            return user.userName ? user : null;
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
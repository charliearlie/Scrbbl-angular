angular.module('Scrbbl')
  .factory('UserPersistence', ['$cookies', function ($cookies) {
    var userName = "";
    var key = "";

    return {
        setCookieData: function(user) {
            userName = user.username;
            key = user.key;
            $cookies.put("userName", userName);
            $cookies.put("key", key);
        },
        getCookieData: function() {
            var user = {};
            user.userName = $cookies.get("userName");
            user.key = $cookies.get("key");
            if (user.userName) {
                return user;
            } else {
                return null;
            }
        },
        clearCookieData: function() {
            userName = "";
            key = "";
            $cookies.remove("userName");
            $cookies.remove("key");
        },
        getCookieKey: function() {
            var key = null;
            if ($cookies.get("key")) {
                key = $cookies.get("key");
            }
            return key;
        }
    }
  }]);
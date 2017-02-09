angular.module('Scrbbl')
  .factory('Scrobble', ['$http', '$cookies', function ($http, $cookies) {
    var userName = "";
    var authToken = "";

    return {
        setCookieData: function(username) {
            userName = username;
            $cookies.put("userName", username);
        },
        getCookieData: function() {
            userName = $cookies.get("userName");
            return userName;
        },
        clearCookieData: function() {
            userName = "";
            $cookies.remove("userName");
        }
    }
  }]);
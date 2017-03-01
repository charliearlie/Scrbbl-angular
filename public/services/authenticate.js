(function () {
    app.factory('Authenticate', ['$http', '$window', '$location', function ($http, $window, $location) {
            return {
                login: login,
                createSession: createSession
            };

            function login() {
                var callbackUrl = $location.absUrl().split('?')[0];
                return $window.location.href = 'http://www.last.fm/api/auth/?api_key=f4f831e3766b42660d26c9b29b25599e&cb=' + callbackUrl;
            }
            function createSession(token) {
                return $http.get('/api/auth/' + token);
            }
        }]);
} ());


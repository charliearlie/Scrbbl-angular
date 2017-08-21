'use strict';

(function () {
    app.factory('LastfmUser', ['$http', '$q', 'UserPersistence', '$window', '$location', lastfmUserService]);

    function lastfmUserService($http, $q, UserPersistence, $window, $location) {

        return {
            getUserData: getUserData,
            getTopArtists: getTopArtists,
            login: login,
            createSession: createSession
        }

        function login() {
            var callbackUrl = $location.absUrl().split('?')[0];
            return $window.location.href = 'http://www.last.fm/api/auth/?api_key=f4f831e3766b42660d26c9b29b25599e&cb=' + callbackUrl;
        }

        function createSession(token) {
            return $http.get('/api/auth/' + token);
        }

        function getUserData(user) {
            return $http.get('/api/user/getuserplays/' + user)
                .then(sendResponseData)
                .catch(sendResponseDataError);
        }

        function getTopArtists() {
            var user = UserPersistence.getCookieData();
            var deferred = $q.defer();
            return $http({
                    method: 'GET',
                    url: '/api/user/getusertopartists',
                    headers: {
                        user: user.userName
                    }
                })
                .then(function (result) {
                    return result.data;
                });
        }

        function sendResponseData(response) {
            return response.data.recenttracks.track
        }

        function sendResponseDataError(response) {
            console.log(response);
        }

    }
}());
'use strict';

(function () {
    app.factory('LastfmUser', ['$http', '$q', 'UserPersistence', lastfmUserService]);

    function lastfmUserService($http, $q, UserPersistence) {

        return {
            getUserData: getUserData,
            getTopArtists: getTopArtists
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
            .then(function(result) {
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
} ());
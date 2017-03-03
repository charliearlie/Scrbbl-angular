'use strict';

(function () {
    app.factory('LastfmUser', ['$http', '$q', lastfmUserService]);

    function lastfmUserService($http, $q) {

        return {
            getUserData: getUserData
        }

        function getUserData(user) {
            return $http.get('/api/user/getuserplays/' + user)
                .then(sendResponseData)
                .catch(sendResponseDataError);
        }

        function sendResponseData(response) {
            return response.data.recenttracks.track
        }

        function sendResponseDataError(response) {
            console.log(response);
        }

    }
} ());
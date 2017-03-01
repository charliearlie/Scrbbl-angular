app.factory('lastfmUser', ['$http', '$q', lastfmUserService]);

function lastfmUserService($http, $q) {

    function getUserData() {
        return $http.get('/api/user/getstuff')
            .then(sendResponseData)
            .catch(sendResponseDataError);
    }

}
angular.module('Scrbbl')
  .factory('Scrobble', ['$http', '$window', function ($http, $window) {
    return {
      scrobbleTrack: function (track) {
        return $http.post('/api/scrobble', track);
      },
      searchAlbum: function (album) {
        return $http.post('/api/searchalbum', album);
      },
      scrobbleAlbum: function (album) {
        return $http.post('/api/scrobblealbum', album);
      }
    }
  }]);
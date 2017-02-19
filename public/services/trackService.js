angular.module('Scrbbl')
  .factory('Track', ['$http', '$window', function ($http, $window) {
    return {
      getAlbumTracks: function (collectionId) {
        return $http.get('/api/albums/getalbuminfo/' + collectionId);
      }
    }
  }]);
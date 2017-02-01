angular.module('Scrbbl')
  .factory('Scrobble', ['$http', '$window', function($http, $window) {
      return {
        scrobbleTrack: function(track) {
            return $http.post('/api/scrobble', track)
                    .success(function(data) {
                        console.log(data);
                    })
                    .error(function(data){
                        console.log('Error: ' + data);
                    });
        }
    }
  }]);
angular.module('Scrbbl')
  .factory('Radio', ['$http', '$window', function ($http, $window) {
    return {
      getStationPlays: function (station) {
        return $http.get('/api/radio/getstationplays/' + station);
      }
    }
  }]);
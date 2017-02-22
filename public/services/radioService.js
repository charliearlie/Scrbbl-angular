(function () {
  angular.module('Scrbbl')
    .factory('Radio', ['$http', '$window', function ($http, $window) {
      return {
        getStationPlays: getStationPlays
      };

      function getStationPlays(station) {
        return $http.get('/api/radio/getstationplays/' + station);
      }
    }]);
} ());
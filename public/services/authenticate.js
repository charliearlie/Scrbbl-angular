angular.module('Scrbbl')
  .factory('Authenticate', ['$http', '$window', function($http, $window) {
      return {
        login: function() {
            return $window.location.href = 'http://www.last.fm/api/auth/?api_key=f4f831e3766b42660d26c9b29b25599e&cb=http://localhost:3000/';
            //return $window.location.href = 'http://www.last.fm/api/auth/?api_key=f4f831e3766b42660d26c9b29b25599e&cb=http://scrbbl.herokuapp.com/';
        },
        createSession: function(token) {
          return $http.get('/api/auth/' + token);
        }
    }
  }]);

 
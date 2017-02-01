angular.module('Scrbbl')
  .factory('Authenticate', ['$http', '$window', function($http, $window) {
      return {
        login: function() {
<<<<<<< HEAD
            //return $window.location.href = 'http://www.last.fm/api/auth/?api_key=f4f831e3766b42660d26c9b29b25599e&cb=http://localhost:3000/';
=======
            // local testing - return $window.location.href = 'http://www.last.fm/api/auth/?api_key=f4f831e3766b42660d26c9b29b25599e&cb=http://localhost:3000/';
>>>>>>> c86a2704c7415312c2a8cb97c1908a03c7eb683a
            return $window.location.href = 'http://www.last.fm/api/auth/?api_key=f4f831e3766b42660d26c9b29b25599e&cb=http://scrbbl.herokuapp.com/';
        },
        createSession: function(token) {
          return $http.get('/api/auth/' + token);
        }
    }
  }]);

 
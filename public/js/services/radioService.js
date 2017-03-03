'use strict';

(function () {
	app.factory('Radio', ['$http', '$window', '$q', function ($http, $window, $q) {
			return {
				getStationPlays: getStationPlays
			};

			function getStationPlays(station) {
				return $http.get('/api/user/getuserplays/' + station)
					.then(function (response) {
						return response.data.recenttracks.track
					})
					.catch(function(response) {
						$q.reject('Error retrieving station plays - (HTTP Status: ' + response.status + ')');
					});
			}
		}]);
} ());
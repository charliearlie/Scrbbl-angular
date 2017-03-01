(function () {
	app.factory('Track', ['$http', '$window', '$q', function ($http, $window, $q) {
			return {
				getAlbumTracks: getAlbumTracks
			};

			function getAlbumTracks(collectionId) {
				return $http.get('/api/albums/getalbuminfo/' + collectionId)
					.then(function(response) {
						return response.data;
					})
					.catch(function(response) {
						return $q.reject("Error getting album tracks");
					});
			}
		}]);
} ());

(function () {
	angular.module('Scrbbl')
		.factory('Scrobble', ['$http', '$window', '$q', function ($http, $window, $q) {
			return {
				scrobbleTrack: scrobbleTrack,
				searchAlbum: searchAlbum,
				scrobbleAlbum: scrobbleAlbum
			};
			
			function scrobbleTrack(track) {
				return $http.post('/api/scrobble', track);
			}

			function searchAlbum(album) {
				return $http.post('/api/searchalbum', album)
					.then(function (response) {
						var results = _.map(response.data.results, function (result) {
							return {
								title: result.collectionName,
								artist: result.artistName,
								collectionId: result.collectionId,
								imageUrl: result.artworkUrl60
							};
						});
						return results;
					})
					.catch(function (response) {
						return $q.reject('Error searching for albums - (HTTP Status: ' + response.status + ')');
					});
			}
			function scrobbleAlbum(album) {
				return $http.post('/api/scrobblealbum', album);
			}
		}]);
} ());
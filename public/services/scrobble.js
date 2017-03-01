(function () {
	app.factory('Scrobble', ['$http', '$window', '$q', 'UserPersistence', function ($http, $window, $q, UserPersistence) {
			
			var user = UserPersistence.getCookieData();

			var topArtists = {};
			return {
				scrobbleTrack: scrobbleTrack,
				searchAlbum: searchAlbum,
				scrobbleAlbum: scrobbleAlbum,
				getArtistScrobbles: getArtistScrobbles,
				getUserTopArtists: getUserTopArtists,
				topArtists: topArtists
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
				return $http({
					method: 'POST',
					url: encodeURI('/api/scrobblealbum'),
					headers: {
						'username': user.userName,
						'key': user.key
					},
					data: album
				});
			}

			function getArtistScrobbles(artist) {
				
			}

			function getUserTopArtists() {
				//This will have to change. Key should not be in the request
				return $http({
					method: 'GET',
					url: encodeURI('api/getartistscrobbles'),
					headers: {
						'username': user.userName,
						'key': user.key
					}
				})
				.then(function(response) {
					return response.data;
				});
			}
		}]);
} ());
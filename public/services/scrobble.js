(function () {
	angular.module('Scrbbl')
		.factory('Scrobble', ['$http', '$window', function ($http, $window) {
			return {
				scrobbleTrack: scrobbleTrack,
				searchAlbum: searchAlbum,
				scrobbleAlbum: scrobbleAlbum
			};
			function scrobbleTrack(track) {
				return $http.post('/api/scrobble', track);
			}
			function searchAlbum(album) {
				return $http.post('/api/searchalbum', album);
			}
			function scrobbleAlbum(album) {
				return $http.post('/api/scrobblealbum', album);
			}
		}]);
} ());
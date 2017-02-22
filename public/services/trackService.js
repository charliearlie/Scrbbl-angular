(function () {
	angular.module('Scrbbl')
		.factory('Track', ['$http', '$window', function ($http, $window) {
			return {
				getAlbumTracks: getAlbumTracks
			};

			function getAlbumTracks(collectionId) {
				return $http.get('/api/albums/getalbuminfo/' + collectionId);
			}
		}]);
} ());

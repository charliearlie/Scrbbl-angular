var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var request = require('request');
var xml2js = require('xml2js');
var _ = require('lodash');
var config = require('./config');
var LastfmApi = require('lastfmapi');
var moment = require('moment');
var http = require('http');
var https = require('https');
var compress = require('compression');
var mb = require('musicbrainz');

var lastfm = new LastfmApi({
	api_key: config.lastfm.key,
	secret: config.lastfm.secret
});
var app = express();
var session = null;

// view engine setup
app.set('port', process.env.PORT || 3000);
app.use(compress())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname, {maxage : 86400000}));

// var songSchema = new mongoose.Schema({
// 	_id: Number,
// 	title: String,
// 	artist: String,
// 	album: String,
// 	albumArtist: String
// });

//var Song = mongoose.model('song', songSchema);

//mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/data/db');



app.get('/api/auth/:token', function (req, res, next) {
	if (req.params.token != 'undefined') {
		lastfm.authenticate(req.params.token, function (error, sess) {
			if (error) throw error;
			session = sess;
			console.log(session);
			return res.json(session);
		});
	}
});

app.get('/api/radio/getstationplays/:station', function(req, res, next) {
	var station = req.params.station;
	var str = '';
	var uri = encodeURI(config.lastfm.hostname + '?method=user.getrecenttracks&user=' + station + 
		'&api_key=' + config.lastfm.key + '&format=json');
	http.get(uri, function (response) {

			response.on('data', function (chunk) {
				str += chunk;
			});
			response.on('end', function () {
				console.log(str);
				ret = JSON.parse(str);
				res.json(ret);
			});
		});
	console.log(station);
});

app.post('/api/scrobble', function (req, res, next) {
	var track = req.body;
	var status = { "success": false };
	console.log(track);
	var date = Math.floor((new Date()).getTime() / 1000) - 300;
	if (track.datePlayed) {
		var douche = track.datePlayed.slice(0, 10) + track.timePlayed.slice(10)
		date = Number(moment(douche).format('X'));
	}
	console.log(date);
	lastfm.track.scrobble({
		'artist': track.songArtist,
		'track': track.songTitle,
		'timestamp': date,
		'album': track.albumArtist 

	}, function (err, scrobbles) {
		if (err) {
			return console.log('We\'re in trouble', err);
			return res.json(status.success);
		}

		console.log('We have just scrobbled:', scrobbles);
		status.success = true;
		return res.json(status.success);
	});
});

app.post('/api/searchalbum', function (req, res, next) {
	var albumDetails = req.body;
	var str = '';
	var ret;
	var uri = encodeURI('http://ws.audioscrobbler.com/2.0/?method=album.search&album=' + albumDetails.title +
		'&api_key=' + config.lastfm.key + '&format=json&limit=99');
	http.get(uri, function (response) {

			response.on('data', function (chunk) {
				str += chunk;
			});
			response.on('end', function () {
				console.log(str);
				ret = JSON.parse(str);
				res.json(ret.results.albummatches.album);
			});
		});

});

app.post('/api/searchalbumtwo', function (req, res, next) {
	var albumDetails = req.body;
	var str = '';
	var ret;
	var uri = encodeURI(config.itunes.hostname + 'search?term=' + albumDetails.title +
		'&media=music&entity=album');
	https.get(uri, function (response) {

			response.on('data', function (chunk) {
				str += chunk;
			});
			response.on('end', function () {
				console.log(str);
				ret = JSON.parse(str);
				console.log(ret);
				res.json(ret);
			});
		});

});

//Need to return a success message somehow!
app.post('/api/scrobblealbum', function (req, res, next) {
	var status = { "success": false };
	var albumToScrobble = req.body;
	var str = '';
	var ret;
	var uri = encodeURI(config.itunes.hostname + 'lookup?id=' + albumToScrobble.collectionId + '&entity=song');

	https.get(uri, function (response) {
		response.on('data', function (chunk) {
			str += chunk;
		});
		response.on('end', function () {
			ret = JSON.parse(str);
			ret.results.shift();
			var tracks = ret.results;
			scrobbleAlbum(albumToScrobble, tracks);
			res.json(true);
			
		});
	});
});



app.get('*', function (req, res) {
	console.log("Hit this function again");
	res.sendFile(__dirname + '/index.html');
});

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.send(500, { message: err.message });
});

app.get('/:token', function (req, res) {
	if (req.param.token) {
		console.log('We can see the token');
	}
	console.log("What is happening");
	//res.sendFile(__dirname + '/index.html');
});

app.listen(app.get('port'), function () {
	console.log("Express server listening on port " + app.get('port'));
});

function scrobbleAlbum(albumToScrobble, tracks) {
	var success = false;
	var time = Math.floor((new Date()).getTime() / 1000) - 300;
	_.forEachRight(tracks, function (track) {
		console.log(track);
		time -= Number(track.trackTimeMillis / 1000);
		lastfm.track.scrobble({
			'artist': track.artistName,
			'track': track.trackCensoredName,
			'timestamp': time,
			'album': track.collectionName

		}, function (err, scrobbles) {
			if (err) {
				return console.log('We\'re in trouble', err);
			}

			console.log('We have just scrobbled:', scrobbles);
			success = true;
		});
	});
}

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

var lastfm = new LastfmApi({
	api_key: config.lastfm.key,
	secret: config.lastfm.secret
});

var app = express();
var session = null;

// view engine setup
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname));

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
		'timestamp': date

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
	http.get('http://ws.audioscrobbler.com/2.0/?method=album.search&album=' + albumDetails.title +
		'&api_key=' + config.lastfm.key + '&format=json&limit=6', function (response) {

			response.on('data', function (chunk) {
				str += chunk;
			});
			response.on('end', function () {
				console.log(str);
				ret = JSON.parse(str);
				res.json(ret);
			});
		});

});

app.post('/api/scrobblealbum', function (req, res, next) {
	var status = { "success": false };
	var albumToScrobble = req.body;
	var str = '';
	var ret;
	var time = Math.floor((new Date()).getTime() / 1000) - 300;
	var uri = 'http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key='
		+ config.lastfm.key + '&artist=' + albumToScrobble.artist
		+ '&album=' + albumToScrobble.title + '&format=json';
	var encodedUri = encodeURI(uri);

	http.get(encodedUri, function (response) {
		response.on('data', function (chunk) {
			str += chunk;
		});
		response.on('end', function () {
			ret = JSON.parse(str);
			var tracks = ret.album.tracks.track;

			_.forEach(tracks, function (track) {
				console.log(track);
				time -= Number(track.duration);
				lastfm.track.scrobble({
					'artist': track.artist.name,
					'track': track.name,
					'timestamp': time

				}, function (err, scrobbles) {
					if (err) {
						return console.log('We\'re in trouble', err);
					}

					console.log('We have just scrobbled:', scrobbles);
					status.success = true;
				});
			});
		});
	});
});

app.get('*', function (req, res) {
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

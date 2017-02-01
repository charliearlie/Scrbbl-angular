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
var LastfmApi = require('lastfmapi');

var lastfm = new LastfmApi({
	api_key : config.lastfm.key,
	secret : config.lastfm.secret
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



app.get('/api/auth/:token', function(req, res, next) {
	if(req.params.token != 'undefined') {
		lastfm.authenticate(req.params.token, function(error, sess) {
			if (error) throw error;
			session = sess;
			console.log(session);
			return res.json(session);
		});
	}
});

app.post('/api/scrobble', function(req, res, next) {
	var track = req.body;
	console.log(track);
	lastfm.track.scrobble({
    	'artist' : track.songArtist,
    	'track' : track.songTitle,
   	 	'timestamp' : Math.floor((new Date()).getTime() / 1000) - 300

	}, function (err, scrobbles) {
    	if (err) { return console.log('We\'re in trouble', err); }

    	console.log('We have just scrobbled:', scrobbles);
	});
});

app.get('*', function(req, res) {
  res.redirect(req.originalUrl);
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.send(500, {message: err.message});
});

app.get('/:token', function (req, res) {
	if (req.param.token) {
		console.log('We can see the token');
	}
	console.log("What is happening");
	//res.sendFile(__dirname + '/index.html');
});

app.listen(app.get('port'), function() {
  	console.log("Express server listening on port " + app.get('port'));
});

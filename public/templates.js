angular.module('Scrbbl').run(['$templateCache', function($templateCache) {$templateCache.put('views/404.html','<div class="jumbotron notfound">\r\n    <div class="container">\r\n        <div class="code-area">\r\n            <span style="color: #bdbdbd;font-style:italic;"> // 404 page not found.</span>\r\n            <span>\r\n                <span style="color:#d65562;"> if</span>\r\n                (<span style="color:#777;">!found</span>) {\r\n            </span>\r\n            <span>\r\n                <span style="padding-left: 15px;color:#2796ec">\r\n                    <i style="width: 10px;display:inline-block"></i>throw\r\n                </span>\r\n                <span>\r\n                    (<span style="color: #a6a61f">"(\u256F\xB0\u25A1\xB0)\u256F\uFE35 \u253B\u2501\u253B"</span>);\r\n                </span>\r\n                <span style="display:block">}</span>\r\n            </span>\r\n        </div>\r\n    </div>\r\n</div>');
$templateCache.put('views/charts.html','<div class="jumbotron charts">\r\n    <div class="row">\r\n        <div class="artist-header col-lg-6">\r\n            <div class="image col-lg-3">\r\n                <img src="{{topArtists[0].image[2][\'#text\']}}" />\r\n            </div>\r\n            <div class="header col-lg-9">\r\n                <div class="row">\r\n                    <h3>Top Artist</h3>\r\n                </div>\r\n                <div class="row">\r\n                    <h2>{{topArtists[0].name}}</h2>\r\n                    <p>Plays: {{topArtists[0].playcount}}</p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>');
$templateCache.put('views/home.html','<div class="jumbotron">\n    <div class="container">\n        <div class="row">\n            <h1 class="main-header">Scrbbl</h1>\n            <div>\n               <h3>Scrbbl is currently under development.</h3> \n               <p>Although functionality may work on some occasions there may be other times where it doesn\'t.</p>\n               <p>The design is also a work in progress and will be improving over the lifecycle of the site\'s development. If you have any suggestions please email me at cw5790@gmail.com</p>\n            </div>\n        </div>\n    </div>\n</div>');
$templateCache.put('views/manual.html','<div class="jumbotron">\r\n    <div class="container">\r\n        <div class="alert alert-success alert-dismissible" role="alert" ng-if="success">\r\n            <button type="button" ng-click="{{success = false}}" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\r\n            <strong>Success</strong> - Track scrobbled successfully.\r\n        </div>\r\n\r\n        <div class="page-header" id="banner">\r\n            <div class="row">\r\n                <div class="col-lg-8 col-md-7 col-sm-6">\r\n                    <form class="form-horizontal" name="manualform" ng-if="!success && !loading">\r\n                        <fieldset>\r\n                            <!-- Text input-->\r\n                            <div class="form-group">\r\n                                <label class="col-md-2 control-label" for="artistinput">Artist</label>\r\n                                <div class="col-md-8">\r\n                                    <input ng-model="track.songArtist" id="artistinput" name="artistinput" type="text" placeholder="" class="form-control input-md"\r\n                                    ng-required="true">\r\n                                    <span ng-show="manualform.artistinput.$error.required && manualform.artistinput.$touched" style="color:#D32F2F">Track artist is required</span>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <!-- Text input-->\r\n                            <div class="form-group">\r\n                                <label class="col-md-2 control-label" for="songinput">Song Title</label>\r\n                                <div class="col-md-8">\r\n                                    <input ng-model="track.songTitle" id="songinput" name="songinput" type="text" placeholder="" class="form-control input-md"\r\n                                        ng-required="true">\r\n                                    <span ng-show="manualform.songinput.$error.required && manualform.songinput.$touched" style="color:#D32F2F">Track title is required</span>\r\n\r\n                                </div>\r\n                            </div>\r\n\r\n                            <!-- Text input-->\r\n                            <div class="form-group">\r\n                                <label class="col-md-2 control-label" for="albuminput">Album Title</label>\r\n                                <div class="col-md-8">\r\n                                    <input ng-model="track.albumTitle" id="albuminput" name="albuminput" type="text" placeholder="" class="form-control input-md">\r\n\r\n                                </div>\r\n                            </div>\r\n\r\n                            <!-- Text input-->\r\n                            <div class="form-group">\r\n                                <label class="col-md-2 control-label" for="albumartistinput">Album Artist</label>\r\n                                <div class="col-md-8">\r\n                                    <input ng-model="track.albumArtist" id="albumartistinput" name="albumartistinput" type="text" placeholder="" class="form-control input-md">\r\n\r\n                                </div>\r\n                            </div>\r\n                            <div class="form-group">\r\n                                <label class="col-md-2 control-label" for="dateinput">Date (Optional)</label>\r\n                                <div class="col-md-4">\r\n                                    <input ng-model="track.datePlayed" id="dateinput" name="dateinput" type="date" placeholder="" class="form-control input-md">\r\n\r\n                                </div>\r\n                                <div class="col-md-4">\r\n                                    <input ng-model="track.timePlayed" id="timeinput" name="timeinput" type="time" ng-if="track.datePlayed" class="form-control input-md">\r\n\r\n                                </div>\r\n                                <br><br>\r\n                                <p style="font-size:12px">Date is currently Chrome only unless you want to format it yourself</p>\r\n                            </div>\r\n\r\n                            <!-- Button (Double) -->\r\n                            <div class="form-group">\r\n                                <label class="col-md-4 control-label" for="scrobblebutton"></label>\r\n                                <div class="col-md-8" ng-if="user">\r\n                                    <button id="scrobblebutton" name="scrobblebutton" class="btn btn-success" ng-click="scrobble()" ng-disabled="manualform.$invalid">Scrobble</button>\r\n                                    <button id="clearbutton" ng-click="clearForm()" name="clearbutton" class="btn btn-danger">Clear</button>\r\n                                </div>\r\n                                <div class="col-md-8" ng-if="!user">\r\n                                    <button id="loginbutton" name="loginbutton" class="btn btn-danger" ng-click="authenticate()">Login with Last.FM</button>\r\n                                </div>\r\n                            </div>\r\n\r\n                        </fieldset>\r\n                    </form>\r\n\r\n\r\n                    <div ng-if="artistScrobbles">\r\n                        <p>You have scrobbled {{track.songArtist}} {{artistScrobbles}} times</p>\r\n                    </div>\r\n\r\n                    <div ng-if="success">\r\n                        <h4 ng-if="success">Track scrobbled successfully</h4>\r\n                        <button id="scrobbleagainbutton" name="srobbleagainbutton" class="btn btn-success" ng-click="refreshForm()">Scrobble another</button>\r\n                    </div>\r\n                    <div ng-if="loading">\r\n                        <div class="loader">Loading...</div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n\r\n    </div>\r\n</div>');
$templateCache.put('views/scrobblealbum.html','<div class="jumbotron">\r\n    <div class="container">\r\n\r\n        <div class="page-header" id="banner">\r\n            <div class="row">\r\n                <div class="col-lg-8 col-md-7 col-sm-6">\r\n                    <form class="form-horizontal" ng-if="!success && !loading" name="albumform">\r\n                        <fieldset>\r\n\r\n                            <!-- Text input-->\r\n                            <div class="form-group">\r\n                                <label class="col-md-2 control-label" for="songinput">Album</label>\r\n                                <div class="col-md-8">\r\n                                    <input ng-model="album.title" id="albumsearch" name="albumsearch" type="text" placeholder="" class="form-control input-md" ng-required="true">\r\n                                    <span ng-show="albumform.albumsearch.$error.required && albumform.albumsearch.$touched" style="color:#D32F2F">Search field required</span>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <!-- Button (Double) -->\r\n                            <div class="form-group">\r\n                                <label class="col-md-4 control-label" for="scrobblebutton"></label>\r\n                                <div class="col-md-8 buttonsubmit" ng-if="user">\r\n                                    <button id="searchbutton" name="searchbutton" class="btn btn-primary" ng-click="search()" ng-disabled="albumform.$invalid">Search</button>\r\n                                </div>\r\n                                <div class="col-md-8 buttonsubmit" ng-if="!user">\r\n                                    <button id="loginbutton" name="loginbutton" class="btn btn-danger" ng-click="authenticate()">Login with Last.FM</button>\r\n                                </div>\r\n                            </div>\r\n\r\n                        </fieldset>\r\n                    </form>\r\n                    <div ng-if="selectedAlbum.artist">\r\n                        <p>Scrobble {{selectedAlbum.artist}} - {{selectedAlbum.title}}?</p>\r\n                        <button id="scrobblebutton" name="scrobblebutton" class="btn btn-success" ng-click="scrobbleAlbum()">Scrobble album</button>\r\n                        <h4 style="margin-top:20px">Edit track tags</h4>\r\n                    </div>\r\n                        <div class="col-lg-12 track-edit" ng-if="album.tracks" ng-repeat="track in album.tracks">\r\n                            <fieldset>\r\n                            <div class="form-group">\r\n                                <label class="col-md-2 col-lg-4 control-label" for="artistinput">Artist</label>\r\n                                <div class="col-md-8">\r\n                                    <input ng-model="track.artistName" id="artistinput" name="artistinput" type="text" placeholder="" class="form-control input-md">\r\n\r\n\r\n                                </div>\r\n                            </div>\r\n                            <div class="form-group">\r\n                                <label class="col-md-2 col-lg-4 control-label" for="songinput">Song Title</label>\r\n                                <div class="col-md-8">\r\n                                    <input ng-model="track.trackCensoredName" id="songinput" name="songinput" type="text" placeholder="" class="form-control input-md">\r\n\r\n                                </div>\r\n                            </div>\r\n                        </fieldset>\r\n\r\n                        </div>\r\n                    <div ng-if="success">\r\n                        <h4 ng-if="success">Album scrobbled successfully</h4>\r\n                        <button id="scrobbleagainbutton" name="srobbleagainbutton" class="btn btn-success" ng-click="refreshForm()">Scrobble another</button>\r\n                    </div>\r\n                    <div ng-if="loading">\r\n                        <div class="loader">Loading...</div>\r\n                    </div>\r\n\r\n                </div>\r\n                <div class="col-lg-4 col-md-5 col-sm-6">\r\n                    <div class="result col-lg-12" ng-repeat="result in results" ng-click="selectResult(result)">\r\n                        <div class="col-lg-3">\r\n                            <img src="{{result.imageUrl}}" alt="{{result.title + \' artwork\'}}" />\r\n                        </div>\r\n\r\n                        <div class="col-lg-9">\r\n                            <h5>{{result.title}}</h5>\r\n                            <p style="font-size:10px">{{result.artist}}</p>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</div>');
$templateCache.put('views/scrobbleradio.html','<div class="jumbotron">\r\n    <div class="container">\r\n\r\n        <div class="page-header" id="banner">\r\n            <div class="row">\r\n                <div class="col-lg-8 col-md-7 col-sm-6">\r\n                    <form class="form-horizontal" ng-if="!success && !loading">\r\n                        <fieldset>\r\n\r\n                            <!-- Text input-->\r\n                            <div class="form-group">\r\n                                <label class="col-md-2 control-label" for="songinput">Station</label>\r\n                                <div class="col-md-8">\r\n                                    <select style="width: 80%" ng-change="getStationPlays()" ng-model="search.selectedStation" \r\n                                                    ng-options="x.lastfmName as x.station for x in stations"></select>\r\n\r\n                                </div>\r\n                            </div>\r\n                            <div class="form-group">\r\n                                <div class="col-md-8 buttonsubmit" ng-if="user && results">\r\n                                    <button id="radiobutton" name="radiobutton" class="btn btn-success formbutton" ng-click="scrobbleSelected()">Scrobble selected tracks</button>\r\n                                </div>\r\n                                <div class="col-md-8 buttonsubmit" ng-if="!user">\r\n                                    <button id="loginbutton" name="loginbutton" class="btn btn-danger formbutton" ng-click="authenticate()">Login with Last.FM</button>\r\n                                </div>\r\n                            </div>\r\n\r\n                        </fieldset>\r\n                    </form>\r\n                    <div ng-if="success">\r\n                        <h4 ng-if="success">Tracks scrobbled successfully</h4>\r\n                        <button id="scrobbleagainbutton" name="srobbleagainbutton" class="btn btn-success" ng-click="refreshForm()">Scrobble another</button>\r\n                    </div>\r\n                    <div ng-if="loading">\r\n                        <div class="loader">Loading...</div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class="row">\r\n                <div class="col-lg-8 col-md-8 radio-track" ng-if="results" ng-repeat="result in results">\r\n                    <div class="col-lg-1 col-md-1">\r\n                        <input type="checkbox" ng-model="result.toScrobble">\r\n                    </div>\r\n                    <div class="col-lg-7 col-md-7" >\r\n                        <p id="radio-track-info" style="margin-top:1px; font-weight:400;">{{result.artist}} - {{result.title}}</p>\r\n                    </div>\r\n                    <div class="col-lg-3 col-md-3 pull-right">\r\n                        <p id="radio-track-date" style="margin-top:1px;">{{result.date}}</p>\r\n                    </div>\r\n                    \r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n\r\n\r\n    </div>\r\n</div>');
$templateCache.put('views/scrobbleuser.html','<div class="jumbotron">\r\n    <div class="container">\r\n\r\n        <div class="page-header" id="banner">\r\n            <div class="row">\r\n                <div class="col-lg-8 col-md-7 col-sm-6">\r\n                    <form class="form-horizontal" ng-if="!success && !loading" name="lastfmuserform">\r\n                        <fieldset>\r\n\r\n                            <!-- Text input-->\r\n                            <div class="form-group">\r\n                                <label class="col-md-2 control-label" for="songinput">User</label>\r\n                                <div class="col-md-8">\r\n                                    <input id="lastfmuserinput" name="lastfmuserinput" type="text" ng-model="lastfmuser.name" class="form-control input-md" ng-required="true">\r\n                                    <span ng-show="lastfmuserform.lastfmuserinput.$error.required && lastfmuserform.lastfmuserinput.$touched" style="color:#D32F2F">User field required</span>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <!-- Button (Double) -->\r\n                            <div class="form-group">\r\n                                <label class="col-md-4 control-label" for="scrobblebutton"></label>\r\n                                <div class="col-md-8 buttonsubmit" ng-if="user && !results">\r\n                                    <button id="searchbutton" name="searchbutton" class="btn btn-primary" ng-click="searchUser()" ng-disabled="albumform.$invalid">Search</button>\r\n                                </div>\r\n                                <div class="col-md-8 buttonsubmit" ng-if="user && results">\r\n                                    <button id="radiobutton" name="radiobutton" class="btn btn-success formbutton" ng-click="scrobbleSelected()">Scrobble selected tracks</button>\r\n                                </div>\r\n                                <div class="col-md-8 buttonsubmit" ng-if="!user">\r\n                                    <button id="loginbutton" name="loginbutton" class="btn btn-danger" ng-click="authenticate()">Login with Last.FM</button>\r\n                                </div>\r\n                            </div>\r\n\r\n                        </fieldset>\r\n                    </form>\r\n                    <div ng-if="success">\r\n                        <h4 ng-if="success">Scrobbled from user successfully</h4>\r\n                        <button id="scrobbleagainbutton" name="srobbleagainbutton" class="btn btn-success" ng-click="refreshForm()">Scrobble another</button>\r\n                    </div>\r\n                    <div ng-if="loading">\r\n                        <div class="loader">Loading...</div>\r\n                    </div>\r\n\r\n                </div>\r\n            </div>\r\n\r\n            <div class="row">\r\n                <div class="col-lg-8 col-md-8 radio-track" ng-if="results" ng-repeat="result in results">\r\n                    <div class="col-lg-1 col-md-1">\r\n                        <input type="checkbox" ng-model="result.toScrobble">\r\n                    </div>\r\n                    <div class="col-lg-7 col-md-7" >\r\n                        <p id="radio-track-info" style="margin-top:1px; font-weight:400;">{{result.artist}} - {{result.title}}</p>\r\n                    </div>\r\n                    <div class="col-lg-3 col-md-3 pull-right">\r\n                        <p id="radio-track-date" style="margin-top:1px;">{{result.date}}</p>\r\n                    </div>\r\n                    \r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</div>');
$templateCache.put('views/templates/firstVisitMessage.html','<div class="mdl-card mdl-shadow--2dp demo-card-wide">\n\n    <div class="mdl-card__title">\n        <h2 class="mdl-card__title-text">Welcome</h2>\n        <!-- / .mdl-card__title -->\n    </div>\n\n    <div class="mdl-card__supporting-text">\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis pellentesque lacus eleifend lacinia...\n        <!-- / .mdl-card__supporting-text -->\n    </div>\n\n    <div class="mdl-card__actions mdl-card--border">\n        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Get Started</a>\n        <!-- / .mdl-card__actions mdl-card--border -->\n    </div>\n\n    <div class="mdl-card__menu">\n        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">\n        <i class="material-icons">share</i>\n      </button>\n        <!-- / .mdl-card__menu -->\n    </div>\n\n    <!-- / .mdl-card mdl-shadow--2dp demo-card-wide -->\n</div>\n<hr />\n\n<h2>\u6B63\u65B9\u5F62</h2>\n\n<div class="mdl-card mdl-shadow--2dp demo-card-square">\n\n    <div class="mdl-card__title mdl-card--expand">\n        <h2 class="mdl-card__title-text">Update</h2>\n        <!-- / .mdl-card__title mdl-card--expand -->\n    </div>\n\n    <div class="mdl-card__supporting-text">\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.\n        <!-- / .mdl-card__supporting-text -->\n    </div>\n\n    <div class="mdl-card__actions mdl-card--border">\n        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">View Updates</a>\n        <!-- / .mdl-card__actions mdl-card--border -->\n    </div>\n\n    <!-- / .mdl-card mdl-shadow--2dp demo-card-square -->\n</div>');
$templateCache.put('views/templates/manualScrobbleForm.html','<form class="form-horizontal" name="manualform" ng-if="!success && !loading">\r\n    <fieldset>\r\n        <!-- Text input-->\r\n        <div class="form-group">\r\n            <label class="col-md-2 control-label" for="artistinput">Artist</label>\r\n            <div class="col-md-8">\r\n                <input ng-model="track.songArtist" id="artistinput" name="artistinput" type="text" placeholder="" class="form-control input-md"\r\n                    ng-required="true">\r\n                <span ng-show="(manualform.artistinput.$error.required && manualform.artistinput.$touched)" style="color:#D32F2F">Track artist is required</span>\r\n            </div>\r\n\r\n        </div>\r\n\r\n        <!-- Text input-->\r\n        <div class="form-group">\r\n            <label class="col-md-2 control-label" for="songinput">Song Title</label>\r\n            <div class="col-md-8">\r\n                <input ng-model="track.songTitle" id="songinput" name="songinput" type="text" placeholder="" class="form-control input-md"\r\n                    ng-required="true">\r\n                <span ng-show="manualform.songinput.$error.required && manualform.songinput.$touched" style="color:#D32F2F">Track title is required</span>\r\n\r\n            </div>\r\n        </div>\r\n\r\n        <!-- Text input-->\r\n        <div class="form-group">\r\n            <label class="col-md-2 control-label" for="albuminput">Album Title</label>\r\n            <div class="col-md-8">\r\n                <input ng-model="track.albumTitle" id="albuminput" name="albuminput" type="text" placeholder="" class="form-control input-md">\r\n\r\n            </div>\r\n        </div>\r\n\r\n        <!-- Text input-->\r\n        <div class="form-group">\r\n            <label class="col-md-2 control-label" for="albumartistinput">Album Artist</label>\r\n            <div class="col-md-8">\r\n                <input ng-model="track.albumArtist" id="albumartistinput" name="albumartistinput" type="text" placeholder="" class="form-control input-md">\r\n\r\n            </div>\r\n        </div>\r\n        <div class="form-group">\r\n            <label class="col-md-2 control-label" for="dateinput">Date (Optional)</label>\r\n            <div class="col-md-4">\r\n                <input ng-model="track.datePlayed" id="dateinput" name="dateinput" type="date" placeholder="" class="form-control input-md">\r\n\r\n            </div>\r\n            <div class="col-md-4">\r\n                <input ng-model="track.timePlayed" id="timeinput" name="timeinput" type="time" ng-if="track.datePlayed" class="form-control input-md">\r\n\r\n            </div>\r\n            <br><br>\r\n            <p style="font-size:12px">Date is currently Chrome only unless you want to format it yourself</p>\r\n        </div>\r\n\r\n        <!-- Button (Double) -->\r\n        <div class="form-group">\r\n            <label class="col-md-4 control-label" for="scrobblebutton"></label>\r\n            <div class="col-md-8" ng-if="user">\r\n                <button id="scrobblebutton" name="scrobblebutton" class="btn btn-success" ng-click="scrobble()" ng-disabled="manualform.$invalid">Scrobble</button>\r\n                <button id="clearbutton" ng-click="clearForm()" name="clearbutton" class="btn btn-danger">Clear</button>\r\n            </div>\r\n            <div class="col-md-8" ng-if="!user">\r\n                <button id="loginbutton" name="loginbutton" class="btn btn-danger" ng-click="authenticate()">Login with Last.FM</button>\r\n            </div>\r\n        </div>\r\n\r\n    </fieldset>\r\n</form>');}]);
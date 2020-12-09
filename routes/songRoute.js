'use strict'

var express = require('express');
var SongController = require('../controllers/songController');
var songRoute = express.Router();
const auth = require('../services/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/songs'});

songRoute.route('/song/:id').get(auth.ensureAuth, SongController.getSong);
songRoute.route('/createSong').post(auth.ensureAuth, SongController.saveSong);
songRoute.route('/songs/:album?').get(auth.ensureAuth, SongController.getAllSongs);
songRoute.route('/upload-file-song/:id').post([auth.ensureAuth, md_upload], SongController.uploadAudio);
songRoute.route('/get-file-song/:songFile').get(SongController.getAudioFile)
songRoute.route('/updateListened/:id').get(auth.ensureAuth, SongController.updateListened);

module.exports = songRoute;
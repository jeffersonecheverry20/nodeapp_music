'use strict'

var express = require('express');
var SongController = require('../controllers/songController');
var songRoute = express.Router();
const auth = require('../services/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/songs'});

songRoute.route('/song/:id').get(auth.ensureAuth, SongController.getSong);
songRoute.route('/createSong').post(auth.ensureAuth, SongController.saveSong);
songRoute.route('/songs/:album?').get(auth.ensureAuth, SongController.getSongs);
songRoute.route('/song-update/:id').put(auth.ensureAuth, SongController.updateSong);
songRoute.route('/song-delete/:id').delete(auth.ensureAuth, SongController.deleteSong);
songRoute.route('/upload-file-song/:id').post([auth.ensureAuth, md_upload], SongController.uploadFile);
songRoute.route('/get-file-song/:songFile').get(SongController.getSongFile)

module.exports = songRoute;
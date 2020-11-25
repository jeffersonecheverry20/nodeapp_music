'use strict'

var express = require('express');
var SongController = require('../controllers/songController');
var api = express.Router();
//var md_auth = require('../middlewares/authenticated');

api.post('/createSong', SongController.saveSong);

module.exports = api;
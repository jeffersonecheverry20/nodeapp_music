'use strict'

var express = require('express');
var ArtistController = require('../controllers/artistController');
var api = express.Router();
//var md_auth = require('../middlewares/authenticated');

api.get('/findArtist/:id', ArtistController.getArtists);
api.post('/createArtist', ArtistController.saveArtist);
api.put('/updateArtist/:id', ArtistController.updateArtist);

module.exports = api;
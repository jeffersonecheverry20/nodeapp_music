'use strict'

var express = require('express');
var AlbumController = require('../controllers/albumController');
var api = express.Router();
//var md_auth = require('../middlewares/authenticated');

api.post('/createAlbum', AlbumController.saveAlbum);
api.get('/findAlbum/:id', AlbumController.getAlbum);
api.put('/updateAlbum/:id', AlbumController.updateAlbum);

module.exports = api;
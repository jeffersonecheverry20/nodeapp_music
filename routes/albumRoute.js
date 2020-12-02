'use strict'

var express = require('express');
var AlbumController = require('../controllers/albumController');
var albumRoute = express.Router();
var auth = require('../services/authenticated');

albumRoute.route('/createAlbum').post(auth.ensureAuth, AlbumController.saveAlbum);
albumRoute.route('/findAlbum/:id').get(auth.ensureAuth, AlbumController.getAlbum);
albumRoute.route('/updateAlbum/:id').put(auth.ensureAuth, AlbumController.updateAlbum);

module.exports = albumRoute;
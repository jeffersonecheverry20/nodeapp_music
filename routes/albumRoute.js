'use strict'

var express = require('express');
var AlbumController = require('../controllers/albumController');
var albumRoute = express.Router();
var auth = require('../services/authenticated');
const multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/albums'})

albumRoute.route('/createAlbum').post(auth.ensureAuth, AlbumController.saveAlbum);
albumRoute.route('/findAlbum/:id').get(auth.ensureAuth, AlbumController.getAlbum);
albumRoute.route('/albums/:artist?').get(auth.ensureAuth, AlbumController.getAlbums);
albumRoute.route('/updateAlbum/:id').put(auth.ensureAuth, AlbumController.updateAlbum);
albumRoute.route('/upload-image-album/:id').post([auth.ensureAuth, md_upload], AlbumController.uploadImage);
albumRoute.route('/get-image-album/:imageFile').get(AlbumController.getImageFile)

module.exports = albumRoute;
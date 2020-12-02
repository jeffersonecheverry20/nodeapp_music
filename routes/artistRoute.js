'use strict'

const express = require('express');
const ArtistController = require('../controllers/artistController');
var artistRoute = express.Router();
const auth = require('../services/authenticated');
const multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'})

// Rutas
artistRoute.route('/register-artist').post(ArtistController.saveArtist);
artistRoute.route('/login-artist').post(ArtistController.loginUser);
artistRoute.route('/artist/:id').get(auth.ensureAuth, ArtistController.getArtist);
artistRoute.route('/update-artist/:id').put(auth.ensureAuth, ArtistController.updateArtist);
artistRoute.route('/upload-image/:id').post([md_upload, auth.ensureAuth], ArtistController.uploadImage);
artistRoute.route('/get-image/:imageFile').get(ArtistController.getImageFile);

module.exports = artistRoute;
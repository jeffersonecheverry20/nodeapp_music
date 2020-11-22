'use strict'

const express = require('express');
const ArtistController = require('../controllers/artistController');
var artistRoute = express.Router();
const auth = require('../services/authenticated');

// Rutas
artistRoute.route('/register-artist').post(ArtistController.saveArtist);
artistRoute.route('/login-artist')-this.post(ArtistController.loginUser);

module.exports = artistRoute;
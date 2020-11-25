'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArtistSchema = Schema({
    name: String,
    role: String,
    image: String,
    email: String,
    surname: String,
    password: String,
    cellphone: String,
    descripcion: String,
    socialNetworks: String,
    
});

module.exports = mongoose.model('Artist', ArtistSchema);
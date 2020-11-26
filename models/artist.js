'use strict'

<<<<<<< HEAD
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
    
=======
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ArtistSchema = new Schema({
    email: {type: String},
    password: {type: String},
    name: {type: String},
    surname: {type: String},
    role: {type: String},
    cellphone: {type: String},
    description: {type: String},
    image: {type: String},
    socialNetworks: [{type: String}]
>>>>>>> fb16810c508d257fffc34640c376b9992d799a32
});

module.exports = mongoose.model('Artist', ArtistSchema);
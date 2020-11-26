'use strict'

<<<<<<< HEAD
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = Schema({
    title: String,
    year: Number,
    descripcion: String,
    gender: String,
    image: String,
    artist: {
        type: Schema.ObjectId, ref: 'Artist'
    }
=======
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Artist = require('./artist');

var AlbumSchema = new Schema({
    title: {type: String},
    description: {type: String},
    year: {type: Number},
    image: {type: String},
    artist: {type: Schema.ObjectId, ref: 'Artist'}
>>>>>>> fb16810c508d257fffc34640c376b9992d799a32
});

module.exports = mongoose.model('Album', AlbumSchema);
'use strict'

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
});

module.exports = mongoose.model('Album', AlbumSchema);
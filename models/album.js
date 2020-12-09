'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Artist = require('./artist');

var AlbumSchema = new Schema({
    title: {type: String},
    description: {type: String},
    year: {type: Number},
    genre: {type: String},
    image: {type: String},
    artist: {type: Schema.ObjectId, ref: 'Artist'}
});

module.exports = mongoose.model('Album', AlbumSchema);
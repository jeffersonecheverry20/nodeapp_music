'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SongSchema = new Schema({
    number: {type: String},
    name: {type: String},
    duration: {type: String},
    file: {type: String},
    album: {type: Schema.ObjectId, ref: 'Album'}
});

module.exports = mongoose.model('Song', SongSchema);
'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ArtistSchema = new Schema({
    name: {type: String},
    description: {type: String},
    image: {type: String}
});

module.exports = mongoose.model('Artist', ArtistSchema);
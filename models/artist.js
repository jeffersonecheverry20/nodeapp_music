'use strict'

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
});

module.exports = mongoose.model('Artist', ArtistSchema);
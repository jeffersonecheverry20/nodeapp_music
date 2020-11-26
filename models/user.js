'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {type: String},
    surname: {type: String},
    email: {type: String},
    password: {type: String},
    role: {type: String},
    image: {type: String},
    genre: [{type: String}]
});

module.exports = mongoose.model('User', UserSchema);
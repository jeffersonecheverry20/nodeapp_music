'use strict'

var express = require('express');
var bodyParser = require('body-parser');
const { config } = require('./config/config');
const app = express();

// Rutas
var userRoute = require('./routes/userRoute');
var artistRoute = require('./routes/artistRoute');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('port', config.port);

// Ruta Base
app.use('/api', userRoute);
app.use('/api', artistRoute);

module.exports = {app};
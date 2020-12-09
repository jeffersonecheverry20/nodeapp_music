'use strict'

var express = require('express');
var bodyParser = require('body-parser');
const { config } = require('./config/config');
const app = express();

// Rutas
var userRoute = require('./routes/userRoute');
var artistRoute = require('./routes/artistRoute');
var alumbsRoute = require('./routes/albumRoute');
var songRoute = require('./routes/songRoute');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.set('port', config.port);

// Ruta Base
app.use('/api', userRoute);
app.use('/api', artistRoute);
app.use('/api', alumbsRoute);
app.use('/api', songRoute);

module.exports = {app};

'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var artist_routes = require('./routes/artist');
var album_routes = require('./routes/album');
var song_routes = require('./routes/song');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//configurar cabeceras http

//rutas base
app.use('/api/artist', artist_routes);
app.use('/api/album', album_routes);
app.use('/api/song', song_routes);



module.exports = app;
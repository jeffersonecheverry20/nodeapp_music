'use strict'

var express = require('express');
var bodyParser = require('body-parser');
<<<<<<< HEAD

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
=======
const { config } = require('./config/config');
const app = express();

// Rutas
var userRoute = require('./routes/userRoute');
var artistRoute = require('./routes/artistRoute');

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

module.exports = {app};
>>>>>>> fb16810c508d257fffc34640c376b9992d799a32

'use strict'

var mongoose = require('mongoose');
<<<<<<< HEAD
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/proyecto_ingenieriaSof2',(err, res) => {
    if(err){
        throw err;
    }else{
        console.log("La conexión a la base de datos esta corriendo correctamente ...");

        app.listen(port, function(){
            console.log("El servidor de musica esta escuchando por: "+port);
        });
    }
});
=======
var { app } = require('./app');

mongoose.connect('mongodb+srv://proyecto_ingenieriaSof2:proyecto_ingenieriaSof2@cluster0.pke4e.mongodb.net/music?retryWrites=true&w=majority', {useUnifiedTopology: true, useFindAndModify: false, useNewUrlParser: true}, 
(err, res) => {
    if(err){
        console.log('Error: connecting to Database. '+err);
        throw err;
    } else {
        console.log('Connecting MongoDB Successfull');
        app.listen(app.get('port'), () => {
            console.log(`Node server running in port ${app.get('port')}`);
        });
    }
});
>>>>>>> fb16810c508d257fffc34640c376b9992d799a32

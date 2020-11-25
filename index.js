'use strict'

var mongoose = require('mongoose');
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
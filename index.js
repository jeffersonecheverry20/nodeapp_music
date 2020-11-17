'use strict'

var mongoose = require('mongoose');
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

'use strict'

var path = require('path');
var fs = require('fs');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

const song = require('../models/song');
const { param } = require('../routes/song');

function saveSong(req, res){
    var song = new Song();

    var params = req.body;
    song.name = params.name;
    song.number = params.number;
    song.duration = params.duration;
    song.file = params.file;
    song.album = params.album;

    song.save((err, songStore) =>{
        if(err){
            res.status(500).send({message: 'Ha ocurrido un error al guardar la canción'});
        }else{
            if(!songStore){
                res.status(404).send({message: 'La canción no ha sido guardada'});
            }else{
                res.status(200).send({artist: songStore});
            }
        }
    })

}

module.exports = {
    saveSong
};
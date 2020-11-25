'use strict'

var path = require('path');
var fs = require('fs');

var Artist = require('../models/artist');
var Album = require('../models/album');

const album = require('../models/album');
const { param } = require('../routes/album');

function getAlbum(req, res){

    var albumId = req.params.id;

    Album.findById(albumId, (err, album) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{

            if(!album){
                res.status(404).send({message: 'El álbum no existe en base de datos'});
            }else{
                res.status(200).send({album});
            }
        }
    });
}

function saveAlbum(req, res){
    var album = new Album();

    var params = req.body;
    album.title = params.title;
    album.year = params.year;
    album.descripcion = params.descripcion;
    album.gender = params.gender;
    album.image = params.image;
    album.artist = params.artist;
    

    album.save((err, albumStore) =>{
        if(err){
            res.status(500).send({message: 'Ha ocurrido un error al guardar el album'});
        }else{
            if(!albumStore){
                res.status(404).send({message: 'El album no ha sido guardado'});
            }else{
                res.status(200).send({album: albumStore});
            }
        }
    })

}

function updateAlbum(req, res){

    var albumId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
        if(err){
            res.status(500).send({message: 'Ha ocurrido un error al actualizar el álbum'});
        }else{
            if(!albumUpdated){
                res.status(404).send({message: 'El álbum no ha sido actualizado'});
            }else{
                res.status(200).send({artist: albumUpdated});
            }
        }
    });
}

module.exports = {
    saveAlbum,
    getAlbum,
    updateAlbum
};
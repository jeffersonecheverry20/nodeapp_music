'use strict'

var path = require('path');
var fs = require('fs');

var Artist = require('../models/artist');
var Album = require('../models/album');
const artist = require('../models/artist');
const { param } = require('../routes/artist');

function getArtists(req, res){

    var artistId = req.params.id;

    Artist.findById(artistId, (err, artist) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{

            if(!artist){
                res.status(404).send({message: 'El artista no existe en base de datos'});
            }else{
                res.status(200).send({artist});
            }
        }
    });
}

function saveArtist(req, res){
    var artist = new Artist();

    var params = req.body;
    artist.name = params.name;
    artist.role = params.artist;
    artist.email = params.email;
    artist.password = params.password;
    artist.descripcion = params.descripcion;
    artist.image = params.image;
    artist.surname = params.surname;
    artist.cellphone = params.cellphone;
    artist.socialNetworks = params.socialNetworks;

    artist.save((err, artistStore) =>{
        if(err){
            res.status(500).send({message: 'Ha ocurrido un error al guardar el artista'});
        }else{
            if(!artistStore){
                res.status(404).send({message: 'El artista no ha sido guardado'});
            }else{
                res.status(200).send({artist: artistStore});
            }
        }
    })

}

function updateArtist(req, res){

    var artistId = req.params.id;
    var update = req.body;

    Artist.findByIdAndUpdate(artistId, update, (err, artistUpdated) => {
        if(err){
            res.status(500).send({message: 'Ha ocurrido un error al actualizar el artista'});
        }else{
            if(!artistUpdated){
                res.status(404).send({message: 'El artista no ha sido actualizado'});
            }else{
                res.status(200).send({artist: artistUpdated});
            }
        }
    });
}

module.exports = {
    getArtists,
    saveArtist,
    updateArtist
};
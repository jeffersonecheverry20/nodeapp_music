'use strict'

var path = require('path');
var fs = require('fs');

var Album = require('../models/album');
const { codeResponse, messageResponse } = require('../constantes/constants');

exports.getAlbum = (req, res) => {

    var albumId = req.params.id;

    Album.findById(albumId, (err, album) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {

            if (!album) {
                res.status(404).send({ message: 'El álbum no existe en base de datos' });
            } else {
                res.status(200).send({ album });
            }
        }
    });
}

exports.getAlbums = (req, res) => {
    const artistId = req.params.artist;

    if (!artistId) {
        var find = Album.find({}).sort('title');
    } else {
        var find = Album.find({ artist: artistId }).sort('year');
    }

    find.populate({ path: 'artist' }).exec((err, albums) => {
        if (err) {
            res.status(404).send({
                code: codeResponse.not_successfull,
                message: messageResponse.not_successfull,
                body: 'Error al buscar albumes'
            });
        } else {
            if (!albums) {
                res.status(404).send({
                    code: codeResponse.not_successfull,
                    message: messageResponse.not_successfull,
                    body: 'No se econtraron albumes'
                });
            } else {
                console.log(albums);
                res.status(200).send({
                    code: codeResponse.successfull,
                    message: messageResponse.successfull,
                    body: {
                        albums
                    }
                });
            }
        }
    });
};

exports.saveAlbum = (req, res) => {
    var album = new Album();

    var params = req.body;
    album.title = params.title;
    album.year = params.year;
    album.description = params.description;
    album.genre = params.genre;
    album.image = params.image;
    album.artist = params.artist;


    album.save((err, albumStore) => {
        if (err) {
            res.status(500).send({
                code: codeResponse.not_successfull,
                message: messageResponse.not_successfull,
                body: 'Ha ocurrido un error al guardar el album'
            });
        } else {
            if (!albumStore) {
                res.status(404).send({
                    code: codeResponse.not_successfull,
                    message: messageResponse.not_successfull,
                    body: 'El album no ha sido guardado'
                });
            } else {
                res.status(200).send({
                    code: codeResponse.successfull,
                    message: messageResponse.successfull,
                    body: {
                        album: albumStore 
                    }
                });
            }
        }
    })

}

exports.updateAlbum = (req, res) => {

    var albumId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Ha ocurrido un error al actualizar el álbum' });
        } else {
            if (!albumUpdated) {
                res.status(404).send({ message: 'El álbum no ha sido actualizado' });
            } else {
                res.status(200).send({ artist: albumUpdated });
            }
        }
    });
}

exports.uploadImage = (req, res) => {
    const albumId = req.params.id;

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('.');
        var ext = ext_split[1];

        console.log(file_split);
        console.log(ext_split);

        if (ext === 'png' || ext === 'jpg') {
            Album.findByIdAndUpdate(albumId, { image: file_name }, (err, albumUpdate) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({
                        code: codeResponse.not_successfull,
                        message: messageResponse.not_successfull,
                        body: 'Error al actualizar la imagen'
                    });
                } else {
                    albumUpdate.image = file_name;
                    res.status(200).send({
                        code: codeResponse.successfull,
                        message: messageResponse.successfull,
                        body: {
                            album: albumUpdate
                        }
                    });
                }
            });
        } else {
            res.status(404).send({
                code: codeResponse.not_successfull,
                message: messageResponse.not_successfull,
                body: 'La extensión de la imagen no es correcta, solo puede ser png y jpg'
            });
        }
    } else {
        res.status(404).send({
            code: codeResponse.not_successfull,
            message: messageResponse.not_successfull,
            body: 'La imagen no se ha subido'
        });
    }

};


exports.getImageFile = (req, res) => {

    const imageFile = req.params.imageFile;
    console.log(imageFile);
    const path_file = './uploads/albums/' + imageFile;

    fs.stat(path_file, (err, stats) => {
        if (err) {
            console.log(err);
            res.status(404).send({
                code: codeResponse.not_successfull,
                message: messageResponse.not_successfull,
                body: 'La imagen no existe o se presento un error al acceder a la ruta de la imagen'
            });
        } else {
            console.log(stats);
            res.sendFile(path.resolve(path_file));
        }
    });

};

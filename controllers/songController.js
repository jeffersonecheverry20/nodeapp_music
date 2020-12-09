'use strict'

var path = require('path');
var fs = require('fs');
var Song = require('../models/song');
const { codeResponse, messageResponse } = require('../constantes/constants');

exports.saveSong = (req, res) => {
    var song = new Song();

    var params = req.body;
    song.name = params.name;
    song.number = params.number;
    song.duration = params.duration;
    song.numberTimeListened = params.numberTimeListened;
    song.album = params.album;

    song.save((err, songStore) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                code: codeResponse.not_successfull,
                message: messageResponse.not_successfull,
                body: 'Ha ocurrido un error al guardar la canción'
            });
        } else {
            if (!songStore) {
                res.status(500).send({
                    code: codeResponse.not_successfull,
                    message: messageResponse.not_successfull,
                    body: 'La canción no ha sido guardada'
                });
            } else {
                res.status(200).send({
                    code: codeResponse.successfull,
                    message: messageResponse.successfull,
                    body: {
                        song: songStore
                    }
                });
            }
        }
    })

}

exports.getSong = (req, res) => {
    const songId = req.params.id;

    Song.findById(songId).populate({ path: 'album' }).exec((err, songStored) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                code: codeResponse.not_successfull,
                message: messageResponse.not_successfull,
                body: 'Ha ocurrido un error al buscar la canción'
            });
        } else {
            if (!songStored) {
                res.status(404).send({
                    code: codeResponse.not_successfull,
                    message: messageResponse.not_successfull,
                    body: 'La canción no ha sido encontrada'
                });
            } else {
                res.status(200).send({
                    code: codeResponse.not_successfull,
                    message: messageResponse.not_successfull,
                    body: {
                        song: songStored
                    }
                });
            }
        }
    });
};

exports.getAllSongs = (req, res) => {
    const albumId = req.params.album;

    if (!albumId) {
        var find = Song.find({}).sort('number');
    } else {
        var find = Song.find({ album: albumId }).sort('number');
    }

    find.populate({
        path: 'album',
        populate: {
            path: 'artist',
            model: 'Artist'
        }
    }).exec((err, songsStored) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                code: codeResponse.not_successfull,
                message: messageResponse.not_successfull,
                body: 'Ha ocurrido un error al buscar la canciones'
            });
        } else {
            if (!songsStored) {
                res.status(404).send({
                    code: codeResponse.not_successfull,
                    message: messageResponse.not_successfull,
                    body: 'La canciones no han sido encontradas'
                });
            } else {
                res.status(200).send({
                    code: codeResponse.successfull,
                    message: messageResponse.successfull,
                    body: {
                        songs: songsStored
                    }
                });
            }
        }
    })
};

exports.uploadAudio = (req, res) => {
    const userId = req.params.id;

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\/');
        var file_name = file_split[2];

        var ext_split = file_name.split('.');
        var ext = ext_split[1];

        console.log(file_split);
        console.log(ext_split);

        if (ext === 'mp3' || ext === 'ogg') {
            Song.findByIdAndUpdate(userId, { file: file_name }, (err, songUpdate) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({
                        code: codeResponse.not_successfull,
                        message: messageResponse.not_successfull,
                        body: 'Error al actualizar la imagen'
                    });
                } else {
                    songUpdate.file = file_name;
                    res.status(200).send({
                        code: codeResponse.successfull,
                        message: messageResponse.successfull,
                        body: {
                            song: songUpdate
                        }
                    });
                }
            });
        } else {
            res.status(404).send({
                code: codeResponse.not_successfull,
                message: messageResponse.not_successfull,
                body: 'La extensión del audio no es correcto, solo puede ser mp3 y ogg'
            });
        }
    } else {
        res.status(404).send({
            code: codeResponse.not_successfull,
            message: messageResponse.not_successfull,
            body: 'El audio no se ha subido'
        });
    }

};


exports.getAudioFile = (req, res) => {

    const songFile = req.params.songFile;
    console.log(songFile);
    const path_file = './uploads/songs/' + songFile;

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

exports.updateListened = (req, res) => {

    const songId = req.params.id;

    if (songId) {
        const song = Song.findById(songId, (err, songStored) => {
            if (err) {
                console.log('Error al buscar canción');
                console.log(err);
                return null;
            } else {
                if (!songStored) {
                    console.log('Canción no encontrada');
                    return null;
                } else {
                    console.log(songStored);
                    songStored.numberTimeListened = songStored.numberTimeListened + 1;
                    var find = Song.findByIdAndUpdate(songId, songStored);

                    find.populate({
                        path: 'album',
                        populate: {
                            path: 'artist',
                            model: 'Artist'
                        }
                    }).exec((err, songUpdate) => {
                        if (err) {
                            res.status(500).send({
                                code: codeResponse.not_successfull,
                                message: messageResponse.not_successfull,
                                body: 'Error al actualizar la canción'
                            });
                        } else {
                            if (!songUpdate) {
                                res.status(404).send({
                                    code: codeResponse.not_successfull,
                                    message: messageResponse.not_successfull,
                                    body: 'Canción no encontrada'
                                });
                            } else {
                                songUpdate.numberTimeListened = songStored.numberTimeListened;
                                res.status(200).send({
                                    code: codeResponse.successfull,
                                    message: messageResponse.successfull,
                                    body: {
                                        song: songUpdate
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    } else {
        res.status(404).send({
            code: codeResponse.not_successfull,
            message: messageResponse.not_successfull,
            body: 'El id de la canción es null o vacío'
        });
    }

};
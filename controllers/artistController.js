'use strict'

var path = require('path');
var fs = require('fs');
const Artist = require('../models/artist');
const jwt = require('../services/jwt');
const Album = require('../models/album');
const Song = require('../models/song');
const bcrypt = require('bcrypt-nodejs');
const {codeResponse, messageResponse} = require('../constantes/constants');

exports.getArtist = (req, res) => {

};

exports.saveArtist = (req, res) => {

    if(req.body.email !== null && req.body.password !== null && 
        req.body.name !== null && req.body.description !== null &&
        req.body.cellphone !== null){
        
            bcrypt.hash(req.body.password, null, null, (err, hash) => {
                if(err){
                    console.log(err);
                    res.status(500).send({
                        code: codeResponse.not_successfull,
                        message: messageResponse.not_successfull,
                        body: 'Error al encryptar el password'
                    });
                } else {
                    var artist = new Artist({
                        email: req.body.email,
                        password: hash,
                        name: req.body.name,
                        surname: req.body.surname,
                        role: 'ROLE_ARTIST',
                        cellphone: req.body.cellphone,
                        description: req.body.description,
                        image: null,
                    });

                    if(req.body.socialNetworks !== null && req.body.socialNetworks.length > 0){
                        console.log(req.body.socialNetworks);
                        req.body.socialNetworks.forEach(element => {
                            console.log(element);
                            artist.socialNetworks.push(element);
                        });
                    }

                    artist.save((err, artistStored) => {
                        if(err){
                            console.log(err);
                            res.status(500).send({
                                code: codeResponse.not_successfull,
                                message: messageResponse.not_successfull,
                                body: 'Error al guardar el artista en la base de datos'
                            });
                        } else {
                            res.status(200).send({
                                code: codeResponse.successfull,
                                message: messageResponse.successfull,
                                body: {
                                    artist: artistStored
                                }
                            });
                        }
                    });
                }
            });
    } else {
        res.status(200).send(
            {
                code: codeResponse.not_successfull,
                message: messageResponse.not_successfull,
                body: 'Por favor ingresar la información de todos los campos obligatorios'
            }
        );
    }
};

exports.loginUser = (req, res) => {

    if(req.body.email !== null && req.body.password !== null) {

        Artist.findOne({email: req.body.email.toLowerCase()}, (err, artist) => {
            if(err){
                console.log(err);
                res.status(500).send({
                    code: codeResponse.not_successfull,
                    message: messageResponse.not_successfull,
                    body: 'Error al buscar el usuario en la base de datos'
                });
            } else {
                if(!artist){
                    res.status(404).send({
                        code: codeResponse.not_successfull,
                        message: messageResponse.not_successfull,
                        body: 'El usuario no existe'
                    });
                } else {
                    console.log("Password request ", req.body.password);
                    console.log("Password BD ", artist.password);
                    bcrypt.compare(req.body.password, artist.password, (err, check) => {
                        if(err){
                            console.log(err);
                            res.status(500).send({
                                code: codeResponse.not_successfull,
                                message: messageResponse.not_successfull,
                                body: 'Error al decodificar el password, usuario no logeado'
                            });
                        } else {
                            res.status(200).send({
                                code: codeResponse.successfull,
                                message: messageResponse.successfull,
                                body: {
                                    token: jwt.createToken(artist)
                                }
                            });
                        }
                    });
                }
            }
        });

    } else {
        res.status(200).send({
            code: codeResponse.not_successfull,
            message: messageResponse.not_successfull,
            body: 'El email y/o la password se encuentran vacios'
        });
    }

};


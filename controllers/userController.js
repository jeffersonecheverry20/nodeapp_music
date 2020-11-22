'use strict'

const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');
const {codeResponse, messageResponse} = require('../constantes/constants');
var fs = require('fs');
var path = require('path');
// const { exists } = require('../models/user');

exports.saveUser = (req, res) => {
    console.log('Llego al metodo saveUsuario');
    if(req.body.name !== null && req.body.surname !== null && req.body.email !== null 
        && req.body.password !== null){
        
        bcrypt.hash(req.body.password, null, null, (err, hash) => {
            if(err){
                console.log(err);
                res.status(500).send({
                    code: codeResponse.not_successfull,
                    message: messageResponse.not_successfull,
                    body: 'Error al encryptar el password'
                });
            } else {
                console.log(req.body.name);
                console.log(re.body.surname);
                console.log(req.body.email);
                console.log(req.body.genre);
                var user = new User({
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    role: 'ROLE_USER',
                    image: null,
                    password: hash
                });

                if(req.body.genre != null && req.body.genre.length > 0){
                    console.log(req.body.genre);
                    req.body.genre.forEach(element => {
                        console.log("El elemento es ", element);
                        user.genre.push(element);
                    });
                }

                user.save((err, userStored) => {
                    if(err){
                        console.log(err);
                        res.status(500).send({
                            code: codeResponse.not_successfull,
                            message: messageResponse.not_successfull,
                            body: 'Error al guardar el usuario en la base de datos'
                        });
                    } else {
                        res.status(200).send({
                            code: codeResponse.successfull,
                            message: messageResponse.successfull,
                            body: {
                                user: userStored
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
}

exports.loginUser = (req, res) => {

    if(req.body.email !== null && req.body.password !== null) {

        User.findOne({email: req.body.email.toLowerCase()}, (err, user) => {
            if(err){
                console.log(err);
                res.status(500).send({
                    code: codeResponse.not_successfull,
                    message: messageResponse.not_successfull,
                    body: 'Error al buscar el usuario en la base de datos'
                });
            } else {
                if(!user){
                    res.status(404).send({
                        code: codeResponse.not_successfull,
                        message: messageResponse.not_successfull,
                        body: 'El usuario no existe'
                    });
                } else {
                    console.log("Password request ", req.body.password);
                    console.log("Password BD ", user.password);
                    bcrypt.compare(req.body.password, user.password, (err, check) => {
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
                                    token: jwt.createToken(user)
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

}

exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const user = req.body;

    User.findByIdAndUpdate(userId, user, (err, userUpdate) => {
        if(err){
            res.status(500).send({
                code: codeResponse.not_successfull,
                message: messageResponse.not_successfull,
                body: 'Error actualizando el usuario'
            });
        } else {
            if(user){
                res.status(200).send({
                    code: codeResponse.successfull,
                    message: messageResponse.successfull,
                    body: {
                        user: userUpdate
                    }   
                });
            } else {
                res.status(404).send({
                    code: codeResponse.not_successfull,
                    message: messageResponse.not_successfull,
                    body: 'El usuario no se ha logrado actualizar'
                });
            }
        }
    })

}

exports.uploadImage = (req, res) => {
    const userId = req.params.id;

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('.');
        var ext = ext_split[1];

        console.log(file_split);
        console.log(ext_split);

        if(ext === 'png' || ext === 'jpg'){
            User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdate) => {
                if(err){
                    console.log(err);
                    res.status(500).send({
                        code: codeResponse.not_successfull,
                        message: messageResponse.not_successfull,
                        body: 'Error al actualizar la imagen'
                    });
                } else {
                    userUpdate.image = file_name;
                    res.status(200).send({
                        code: codeResponse.successfull,
                        message: messageResponse.successfull,
                        body: {
                            user: userUpdate
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
    const path_file = './uploads/users/'+imageFile;

    fs.stat(path_file, (err, stats) => {
        if(err){
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
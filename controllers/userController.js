'use strict'

const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');
const {codeResponse, messageResponse} = require('../constantes/constants');
const user = require('../models/user');

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
                var user = new User({
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    role: 'ROLE_USER',
                    image: null,
                    password: hash
                });

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
                    bcrypt.compare(req.body.password, user.password, (err, check) => {
                        if(err){
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
'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'My-Secret';
const {codeResponse, messageResponse} = require('../constantes/constants');

exports.ensureAuth = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(403).send({
            code: codeResponse.not_successfull,
            message: messageResponse.not_successfull,
            body: "Tu petición no tiene cabecera de autorización"
        });
    } else {
        const token = req.headers.authorization.replace(/['"]+/g, '');

        try{
            var payload = jwt.decode(token, secret);
            if(payload.exp <= moment().unix()){
                return res.status(401).send({
                    code: codeResponse.not_successfull,
                    message: messageResponse.not_successfull,
                    body: "Token ha expirado"
                });
            }
        }catch(ex){
            console.log(ex);
            return res.status(404).send({
                code: codeResponse.not_successfull,
                message: messageResponse.not_successfull,
                body: "Token no válido"
            });
        }

        req.user = payload;
        next();
    }
}
'use strict'

const express = require('express');
const UserController = require('../controllers/userController');
const auth = require('../services/authenticated');
// Me permite enviar y subir ficheros por medio del protocolo htttp
const multipart = require('connect-multiparty');
var userRoute = express.Router();

// Middleware que me permite recibir las imagenes e indicar en que rutan se van a guardar
var md_upload = multipart({uploadDir: './uploads/users'})

userRoute.route('/register').post(UserController.saveUser);
userRoute.route('/login').post(UserController.loginUser);
userRoute.route('/update-user/:id').put(auth.ensureAuth, UserController.updateUser);
userRoute.route('/upload-image/:id').post([md_upload, auth.ensureAuth], UserController.uploadImage);
userRoute.route('/get-image/:imageFile').get(auth.ensureAuth, UserController.getImageFile);

module.exports = userRoute;


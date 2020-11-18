'use strict'

const express = require('express');
const UserController = require('../controllers/userController');
const auth = require('../services/authenticated');
var userRoute = express.Router();

userRoute.route('/register').post(UserController.saveUser);
userRoute.route('/login').post(UserController.loginUser);
userRoute.route('/update-user/:id').put(auth.ensureAuth, UserController.updateUser);

module.exports = userRoute;


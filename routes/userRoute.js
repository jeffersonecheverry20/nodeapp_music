'use strict'

const express = require('express');
const UserController = require('../controllers/userController');

var userRoute = express.Router();

userRoute.route('/register').post(UserController.saveUser);
userRoute.route('/login').post(UserController.loginUser);

module.exports = userRoute;


'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'My-Secret';

exports.createToken = (user) => {
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(60, 'minutes').unix()
    };

    return jwt.encode(payload, secret);
}
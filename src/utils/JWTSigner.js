const jwt = require('jsonwebtoken');

function jwtSign(payload) {
    return jwt.sign(payload, process.env.JWTSECRET);
}

module.exports = jwtSign;
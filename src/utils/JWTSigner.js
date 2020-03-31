const jwt = require('jsonwebtoken');

function jwtSign(payload) {
  return jwt.sign(payload, process.env.JWTSECRET, {
    expiresIn: '1h',
  });
}

module.exports = jwtSign;

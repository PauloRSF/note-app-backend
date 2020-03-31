const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function authenticateJWT(req, res, next) {
  const { username } = req.params;
  const authHeader = req.headers.authorization;
  const [, token] = authHeader ? authHeader.split(' ') : '';

  if (!await User.findOne({ username })) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (!token) {
    return res.status(401).json({ error: 'No authorization token supplied' });
  }

  await jwt.verify(token, process.env.JWTSECRET, (error, decoded) => {
    if (error) {
      return res.status(403).json({ error: 'Invalid authorization token' });
    }

    req.user = decoded;
    return next();
  });
}

module.exports = authenticateJWT;

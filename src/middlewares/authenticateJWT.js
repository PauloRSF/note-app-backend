const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function authenticateJWT(req, res, next) {
    const { username } = req.params;
    const authHeader = req.headers.authorization;
    let token;

    if(! await User.findOne({ username })) {
        return res.status(404).json({ error: 'User not found' });
    }

    if(authHeader) {
        token = authHeader.split(" ")[1];
    } else {
        return res.status(401).json({ error: "No authorization token supplied" });
    }

    jwt.verify(token, process.env.JWTSECRET, function(error, decoded) {
        if(error) {
            return res.status(403).json({ error: "Invalid authorization token" });
        }

        req.user = decoded;

        next();
    });
}

module.exports = authenticateJWT;
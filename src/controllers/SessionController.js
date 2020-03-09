const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwtSign = require('../utils/JWTSigner');

module.exports = {
    async login(req, res) {
        const { name, username, password } = req.body;

        const user = await User.findOne({ username });

        if(!user){
            return res.status(404).json({ error: 'The user does not exist' });
        }

        bcrypt.compare(password, user.password, function(err, result) {
            if(!result){
                return res.status(401).json({ error: 'Wrong user credentials' });
            }

            const accessToken = jwtSign({ username, name });

            return res.json({ accessToken });
        });
    }
}
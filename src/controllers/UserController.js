const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    async store(req, res) {
        const { username, password } = req.body;

        if(!username || !password) {
            return res.status(400).send({ error: 'Invalid register credentials' });
        }

        try {
            if(await User.findOne({ username: username })){
                return res.status(400).send({ error: 'User already exists' });
            }

            const user = await User.create(req.body);

            user.password = undefined;

            return res.json({ user });
        } catch(error) {
            return res.status(500).send({ error: 'Registration failed' });
        }
    }
}

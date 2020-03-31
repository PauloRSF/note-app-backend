const User = require('../models/User');
const createResponse = require('../utils/createResponse');

module.exports = {
    async store({ name, username, password }) {
        if(!(name && username && password)) {
            return createResponse(400, { error: 'Invalid register credentials' });
        }

        try {
            if(await User.findOne({ username })){
                return createResponse(409, { error: 'User already exists' });
            }

            const user = await User.create({ name, username, password });

            user.password = undefined;
            return createResponse(200, user);
        } catch(error) {
            return createResponse(500, { error: 'Registration failed' });
        }
    }
}

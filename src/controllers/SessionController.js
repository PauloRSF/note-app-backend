const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwtSign = require('../utils/JWTSigner');
const createResponse = require('../utils/createResponse');

module.exports = {
  async login({ username, password }) {
    const user = await User.findOne({ username });
    let accessToken;

    if (!user) {
      return createResponse(404, { error: 'The user does not exist' });
    }

    if (bcrypt.compareSync(password, user.password)) {
      accessToken = jwtSign({ username });
      return createResponse(200, { accessToken });
    }

    return createResponse(401, { error: 'Wrong user credentials' });
  },
};

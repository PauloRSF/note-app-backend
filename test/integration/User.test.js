const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { assert } = require('chai');
const factory = require('../utils/factories');
const connectDB = require('../../src/utils/connectDB');

describe('user model creation', () => {
  before(connectDB);

  it('should encrypt a user password properly', async () => {
    const password = 'noonewillknow';

    const user = await factory.create('User', { password });

    bcrypt.compare(password, user.password, (err, res) => {
      assert(res, true);
    });
  });

  after(() => {
    mongoose.connection.db.dropDatabase();
  });
});

const request = require('supertest');
const { assert } = require('chai');
const mongoose = require('mongoose');
const app = require('../../src/app');
const factory = require('../utils/factories');
const User = require('../../src/models/User');

describe('user login', () => {
  beforeEach(async () => {
    await User.deleteMany();
  });

  it('should get a jwt for a registered user', async () => {
    const user = {
      username: 'johndoe',
      password: 'johnssecret',
    };

    await factory.create('User', user);

    const res = await request(app)
      .post('/login')
      .send(user)
      .expect(200);

    assert.property(res.body, 'accessToken');
  });

  it('should throw an error when logging in inexistent user', async () => {
    const user = await factory.build('User');

    const res = await request(app)
      .post('/login')
      .send(user)
      .expect(404);

    assert.notProperty(res.body, 'accessToken');
    assert.equal(res.body.error, 'The user does not exist');
  });

  it('should throw an error when logging in user with incorrect password', async () => {
    const user = await factory.create('User');

    user.password = 'wrongpassword';

    const res = await request(app)
      .post('/login')
      .send(user)
      .expect(401);

    assert.notProperty(res.body, 'accessToken');
    assert.equal(res.body.error, 'Wrong user credentials');
  });

  after(() => {
    mongoose.connection.db.dropDatabase();
  });
});

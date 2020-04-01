const request = require('supertest');
const { assert } = require('chai');
const mongoose = require('mongoose');
const app = require('../../src/app');
const factory = require('../utils/factories');
const User = require('../../src/models/User');

describe('user registration', () => {
  beforeEach(async () => {
    await User.deleteMany();
  });

  it('should register a user with valid credentials', async () => {
    const user = await factory.build('User');

    await request(app)
      .post('/register')
      .send(user)
      .expect(200);

    const savedUser = await User.findOne({ username: user.username });

    assert.strictEqual(savedUser.name, user.name);
    assert.strictEqual(savedUser.username, user.username);
  });

  it('should not register a user with an existing username', async () => {
    const user = await factory.build('User');

    await factory.create('User', {
      username: user.username,
    });

    await request(app)
      .post('/register')
      .send(user)
      .expect(409);

    const users = await User.find({ name: user.name });
    assert.isEmpty(users);
  });

  it('should not register a user with a missing field', async () => {
    const user = await factory.build('User', {
      username: undefined,
    });

    await request(app)
      .post('/register')
      .send(user)
      .expect(400);

    const users = await User.find({ name: user.name });
    assert.isEmpty(users);
  });

  after(() => {
    mongoose.connection.db.dropDatabase();
  });
});

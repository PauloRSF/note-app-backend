const { factory } = require('factory-girl');
const faker = require('faker');

const User = require('../../src/models/User');
const Note = require('../../src/models/Note');

factory.define('User', User, () => ({
  name: faker.name.findName(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
}));

factory.define('Note', Note, () => ({
  title: faker.lorem.sentence(),
  text: faker.lorem.paragraphs(),
  user: faker.internet.userName(),
}));

module.exports = factory;

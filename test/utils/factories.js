const { factory } = require('factory-girl');
const User = require('../../src/models/User');
const faker = require('faker');

factory.define('User', User, {
    name: faker.name.findName(),
    username: faker.internet.userName(),
    password: faker.internet.password()
});

module.exports = factory;
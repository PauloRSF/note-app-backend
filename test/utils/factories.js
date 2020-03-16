const { factory } = require('factory-girl');
const User = require('../../src/models/User');
const Note = require('../../src/models/Note');
const faker = require('faker');

factory.define('User', User, function() {
    return {
        name: faker.name.findName(),
        username: faker.internet.userName(),
        password: faker.internet.password()
    };
});

factory.define('Note', Note, {
    title: faker.lorem.sentence(),
    text: faker.lorem.paragraphs()
});

module.exports = factory;
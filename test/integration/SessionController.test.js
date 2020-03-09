const app = require('../../src/app');
const request = require('supertest');
const assert = require('chai').assert;
const mongoose = require('mongoose');
const factory = require('../utils/factories');
const User = require('../../src/models/User');

describe('user login', function() {

    beforeEach(async function() {
        await User.deleteMany();
    });

    it('should get a jwt token for a registered user', async function() {
        const user = {
            username: 'johndoe',
            password: 'johnssecret'
        }

        await factory.create('User', user);

        const res = await request(app)
            .post('/login')
            .send(user)
            .expect(200);

        assert.property(res.body, 'accessToken');
    });

    it('should throw an error when logging in inexistent user', async function() {
        const user = await factory.build('User');
        
        return request(app)
            .post('/login')
            .send(user)
            .expect(404);
    });

    it('should throw an error when logging in user with incorrect password', async function() {
        const user = await factory.create('User');

        user.password = 'wrongpassword';

        return request(app)
            .post('/login')
            .send(user)
            .expect(401);
    })

    after(function(){
        mongoose.connection.db.dropDatabase();
    });
});

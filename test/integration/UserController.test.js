const app = require('../../src/app');
const request = require('supertest');
const mongoose = require('mongoose');
const factory = require('../utils/factories');

describe('user registration', function() {
    it('should register a user with valid credentials', async function() {
        const validUser = await factory.build('User', {
            username: 'john_doe'
        });
        
        return request(app)
            .post('/register')
            .send(validUser)
            .expect(200);
    });

    it('should not register a user with an existing username', async function() {
        const existingUser = await factory.build('User', {
            username: 'john_doe'
        });
        
        return request(app)
            .post('/register')
            .send(existingUser)
            .expect(409);
    });

    it('should not register a user with a missing username', async function() {
        const user = await factory.build('User', {
            username: undefined
        });
        
        return request(app)
            .post('/register')
            .send(user)
            .expect(400);
    });

    after(function(){
        mongoose.connection.db.dropDatabase();
    });
});

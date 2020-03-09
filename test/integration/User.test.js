const mongoose = require('mongoose');
const User = require('../../src/models/User');
const factory = require('../utils/factories');
const bcrypt = require('bcrypt');
const assert = require('chai').assert;

require('dotenv').config({
    path: '.env.test'
});

describe('user model creation', function() {
    before(async function() {
        await mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}?authSource=admin`, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            user: process.env.USER,
            pass: process.env.PASS
        });
    });
    
    it('should encrypt a user password properly', async function() {
        const password = 'noonewillknow'
        
        const user = await factory.create('User', { password });

        bcrypt.compare(password, user.password, function(err, res) {
            assert(res, true);
        });
    });

    after(function(){
        mongoose.connection.db.dropDatabase();
    });
})
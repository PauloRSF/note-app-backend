const mongoose = require('mongoose');
const factory = require('../utils/factories');
const bcrypt = require('bcrypt');
const assert = require('chai').assert;
const connectDB = require('../../src/utils/connectDB');

describe('user model creation', function() {
    before(connectDB);
    
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
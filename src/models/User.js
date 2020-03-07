const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String
});

userSchema.pre('save', async function(next) {
    let plainPassword = this.password;
    
    this.password = await bcrypt.hash(plainPassword, 10);

    next();
});

module.exports = mongoose.model('User', userSchema);
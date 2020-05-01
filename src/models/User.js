const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre('save', async function hashPassword(next) {
  const plainPassword = this.password;
  this.password = await bcrypt.hash(plainPassword, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);

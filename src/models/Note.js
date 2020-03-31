const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  title: String,
  text: { type: String, required: true },
  user: { type: String, required: true },
});

module.exports = mongoose.model('Note', noteSchema);

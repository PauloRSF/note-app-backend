const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: String,
    text: String,
    user: String
});

module.exports = mongoose.model('Note', noteSchema);
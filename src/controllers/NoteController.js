const Note = require('../models/Note');
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const notes = await Note.find({
            user: req.params.username
        });
        
        return res.json({ notes });
    },

    async show(req, res) {
        const note = await Note.findById(req.params.noteId);

        return res.json({ note });
    },

    async store(req, res) {
        const { title, text } = req.body;
        
        const note = await Note.create({
            title,
            text,
            user: req.params.username
        });

        return res.json({ note });
    },

    async update(req, res) {
        return res.send('');
    },

    async delete(req, res) {
        return res.send('');
    }
}
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
        const { title, text } = req.body;

        const note = await Note.findById(req.params.noteId);

        note.title = title? title : note.title;
        note.text = text? text : note.text;

        await note.save();

        return res.json({ note });
    },

    async delete(req, res) {
        await Note.deleteOne({
            id: req.params.noteId
        });

        return res.send('');
    }
}
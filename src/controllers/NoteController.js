const Note = require('../models/Note');
const createResponse = require('../utils/createResponse');

module.exports = {
  async index(user) {
    const notes = await Note.find({ user });

    return createResponse(200, { notes });
  },

  async show(id) {
    const note = await Note.findById(id);

    return createResponse(200, { note });
  },

  async store(user, title, text) {
    let note;

    try {
      note = await Note.create({ title, text, user });
    } catch (err) {
      return createResponse(400, { error: 'New notes must contain a text field' });
    }

    return createResponse(200, { note });
  },

  async update(id, title = '', text = '') {
    const note = await Note.findById(id);

    note.title = title || note.title;
    note.text = text || note.text;

    await note.save();

    return createResponse(200, { note });
  },

  async destroy(id) {
    await Note.deleteOne({
      _id: id,
    });

    return createResponse(200);
  },
};

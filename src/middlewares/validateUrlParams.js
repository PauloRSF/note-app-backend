const Note = require('../models/Note');

async function validateUrlParams(req, res, next) {
  const { username, noteId } = req.params;

  if (username !== req.user.username) {
    return res.status(403).json({ error: 'Can\'t access another user\'s notes' });
  }

  if (noteId) {
    try {
      if (!await Note.findById(noteId)) {
        return res.status(404).json({ error: 'Note not found' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Error checking note existence' });
    }
  }

  return next();
}

module.exports = validateUrlParams;

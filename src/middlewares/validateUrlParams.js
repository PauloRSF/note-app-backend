const User = require('../models/User');
const Note = require('../models/Note');

async function validateUrlParams(req, res, next) {
    const { username, noteId } = req.params;
    
    if(! await User.findOne({ username })) {
        return res.status(404).json({ error: 'User not found' });
    }

    if(username !== req.user.username) {
        return res.status(403).json({ error: 'Can\'t create note for another user' })
    }

    if(noteId){
        try {
            if(! await Note.findById(noteId)) {
                return res.status(404).json({ error: 'Note not found' });
            }
        } catch(error) {
            return res.status(500).json({ error: 'Error checking note existence' })
        }
    }

    next();
}

module.exports = validateUrlParams;
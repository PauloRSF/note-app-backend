const { Router } = require('express');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const NoteController = require('./controllers/NoteController');
const authenticateJWT = require('./middlewares/authenticateJWT');
const validateUrlParams = require('./middlewares/validateUrlParams');

const routes = Router();

routes.post('/register', UserController.store);

routes.post('/login', SessionController.login);

routes.get('/:username/notes', authenticateJWT, validateUrlParams, NoteController.index);
routes.get('/:username/notes/:noteId', authenticateJWT, validateUrlParams, NoteController.show);
routes.post('/:username/notes/', authenticateJWT, validateUrlParams, NoteController.store);
routes.put('/:username/notes/:noteId', authenticateJWT, validateUrlParams, NoteController.update);
routes.delete('/:username/notes/:noteId', authenticateJWT, validateUrlParams, NoteController.delete);

module.exports = routes;
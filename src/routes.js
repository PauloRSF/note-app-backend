const { Router } = require('express');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const NoteController = require('./controllers/NoteController');
const authenticateJWT = require('./middlewares/authenticateJWT');
const validateUrlParams = require('./middlewares/validateUrlParams');
const returnResponse = require('./utils/returnResponse');

const routes = Router();
const noteMiddles = [authenticateJWT, validateUrlParams];

routes.post('/register', (req, res) => {
returnResponse(res, UserController.store(req.body));
});

routes.post('/login', (req, res) => {
    returnResponse(res, SessionController.login(req.body));
});

routes.get('/:username/notes', noteMiddles, (req, res) => {
    returnResponse(res, NoteController.index(req.params.username));
});
routes.get('/:username/notes/:noteId', noteMiddles, (req, res) => {
        returnResponse(res, NoteController.show(req.params.noteId));
});
routes.post('/:username/notes/', noteMiddles, (req, res) => {
        returnResponse(res, NoteController.store(req.params.username, req.body.title,
            req.body.text));
});
routes.put('/:username/notes/:noteId', noteMiddles, (req, res) => {
    returnResponse(res, NoteController.update(req.params.noteId));
});
routes.delete('/:username/notes/:noteId', noteMiddles, (req, res) => {
    returnResponse(res, NoteController.destroy(req.params.noteId));
});

module.exports = routes;
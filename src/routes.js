const { Router } = require('express');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');

const routes = Router();

routes.post('/register', UserController.store);

routes.post('/login', SessionController.login);

module.exports = routes;
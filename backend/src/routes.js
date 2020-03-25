const express = require('express');

const OngController = require('./controllers/ong.controller');
const IncidentsController = require('./controllers/incident.controller');
const ProfileController = require('./controllers/profile.controller');
const SessionController = require('./controllers/session.controller');

const routes = express.Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.post('/incidents', IncidentsController.create);
routes.get('/incidents', IncidentsController.index);
routes.delete('/incidents/:id', IncidentsController.del);

routes.get('/profile', ProfileController.index);

routes.post('/sessions', SessionController.create);

module.exports = {
  routes
}

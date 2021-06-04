const express = require('express');
const route = express.Router();
const ControllerMaestro = require('../Controller/maestro');

route.post('/generarEventos', ControllerMaestro.authUser, ControllerMaestro.postEventos);

route.get('/obtenerEventos/:id', ControllerMaestro.authUser, ControllerMaestro.getAllEventos);

route.put('/actualizarEvento/:id', ControllerMaestro.authUser, ControllerMaestro.putEventos);

route.delete('/eliminarEvento/:id', ControllerMaestro.authUser, ControllerMaestro.deleteEvento);

route.get('/verAsistenciaEvento/:id', ControllerMaestro.authUser, ControllerMaestro.getAsistenciaEvento);

module.exports = route;
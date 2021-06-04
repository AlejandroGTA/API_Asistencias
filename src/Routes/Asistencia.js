const express = require('express');
const route = express.Router();

let ControllerAsistencia = require('../Controller/asistencia');

route.post('/:id', ControllerAsistencia.authUser, ControllerAsistencia.asistenciaAlumno);

module.exports = route;
const express = require('express');
const route = express.Router();

let ControllerAsistencia = require('../Controller/asistencia');

/**
 *  @swagger
 *  tags:
 *    name: Asistencia
 */

/**
 * @swagger
 * /Asistencia/{id}:
 *   post:
 *     description: Toma de Asistencia
 *     tags: [Asistencia]
 *     parameters:
 *     - name: Usuario-Token
 *       description: Token del usuario
 *       in: header
 *       required: true
 *       type: string
 *     - name: id
 *       description: Id del usuario
 *       in: path
 *       required: true
 *       type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             items:
 *               $ref: '#/components/schemas/Usuario_Asistencia'
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Mensaje de error
 */

route.post('/:id', ControllerAsistencia.authUser, ControllerAsistencia.validacionEvento, ControllerAsistencia.asistenciaAlumno);

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Usuario_Asistencia:
 *        type: object
 *        required:
 *          - NameAlumno
 *          - LastNameAlumno
 *          - Localizacion
 *        properties:
 *          NameAlumno:
 *            type: string
 *            description: Nombre del usuario
 *          LastNameAlumno:
 *            type: string
 *            description: apellidos del usuario
 *          Localizacion:
 *            type: string
 *            description: localización del usuario 
 *        example:
 *          NameAlumno: prueba_Name
 *          LastNameAlumno: prueba_LastName
 *          Localizacion: 0,0
 * 
 */

module.exports = route;
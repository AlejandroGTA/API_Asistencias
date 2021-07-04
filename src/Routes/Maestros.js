const express = require('express');
const route = express.Router();
const ControllerMaestro = require('../Controller/maestro');

/**
 *  @swagger
 *  tags:
 *    name: Maestro
 */

/**
 * @swagger
 * /Maestro/generarEventos:
 *   post:
 *     description: Creación del evento
 *     tags: [Maestro]
 *     parameters:
 *     - name: Usuario-Token
 *       description: Token del usuario
 *       in: header
 *       required: true
 *       type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             items:
 *               $ref: '#/components/schemas/Evento_Create'
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Mensaje de error
 */

route.post('/generarEventos', ControllerMaestro.authUser, ControllerMaestro.postEventos);

/**
 * @swagger
 * /Maestro/getQRPagina:
 *   post:
 *     description: Creación de codigo QR de la pagina
 *     tags: [Maestro]
 *     parameters:
 *     - name: Usuario-Token
 *       description: Token del usuario
 *       in: header
 *       required: true
 *       type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             items:
 *               $ref: '#/components/schemas/Evento_URL'
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Mensaje de error
 */

route.post('/getQRPagina', ControllerMaestro.getQRPagina);

/**
 * @swagger
 * /Maestro/obtenerEventos/{id}:
 *   get:
 *     description: Obtener todos los eventos existentes del usuario
 *     tags: [Maestro]
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
 *       default: 60cec1129e80ad04dc10c1d2
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Mensaje de error
 */

route.get('/obtenerEventos/:id', ControllerMaestro.authUser, ControllerMaestro.getAllEventos);

/**
 * @swagger
 * /Maestro/actualizarEvento/{id}:
 *   put:
 *     description: Actualización del evento
 *     tags: [Maestro]
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
 *       default: 60cec5cb8eb920501862fefa
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             items:
 *               $ref: '#/components/schemas/Evento_Update'
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Mensaje de error
 */

route.put('/actualizarEvento/:id', ControllerMaestro.authUser, ControllerMaestro.putEventos);

/**
 * @swagger
 * /Maestro/eliminarEvento/{id}:
 *   delete:
 *     description: Eliminación del evento
 *     tags: [Maestro]
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
 *       default: 60cec5cb8eb920501862fefa
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Mensaje de error
 */

route.delete('/eliminarEvento/:id', ControllerMaestro.authUser, ControllerMaestro.deleteEvento);

/**
 * @swagger
 * /Maestro/verAsistenciaEvento/{id}:
 *   get:
 *     description: Obtener evento
 *     tags: [Maestro]
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
 *       default: 60cec5cb8eb920501862fefa
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Mensaje de error
 */

route.get('/verAsistenciaEvento/:id', ControllerMaestro.authUser, ControllerMaestro.getAsistenciaEvento);

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Evento_Create:
 *        type: object
 *        required:
 *          - NameEvent
 *          - MaestroId
 *          - TiempoInicio
 *          - TiempoExpiracion
 *          - Localizacion
 *        properties:
 *          NameEvent:
 *            type: string
 *            description: Nombre del evento
 *          MaestroId:
 *            type: string
 *            description: Id del maestro
 *          TiempoInicio:
 *            type: string
 *            description: Tiempo de inicio del evento 
 *          TiempoExpiracion:
 *            type: string
 *            description: Tiempo final del evento
 *          Localizacion:
 *            type: string
 *            description: Localización del evento 
 *        example:
 *          NameEvent: prueba_Name_Event
 *          MaestroId: 60cec1129e80ad04dc10c1d2
 *          TiempoInicio: Fri Jun 04 2021 15:51:00 GMT+0000 (Coordinated Universal Time)
 *          TiempoExpiracion: Fri Jun 04 2025 15:51:00 GMT+0000 (Coordinated Universal Time)
 *          Localizacion: 0,0
 * 
 */

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Evento_Update:
 *        type: object
 *        required:
 *          - NameEvent
 *          - TiempoInicio
 *          - TiempoExpiracion
 *          - Localizacion
 *        properties:
 *          NameEvent:
 *            type: string
 *            description: Nombre del evento
 *          TiempoInicio:
 *            type: string
 *            description: Tiempo de inicio del evento 
 *          TiempoExpiracion:
 *            type: string
 *            description: Tiempo final del evento
 *          Localizacion:
 *            type: string
 *            description: Localización del evento
 *        example:
 *          NameEvent: prueba_Name_Event
 *          TiempoInicio: Fri Jun 04 2021 15:51:00 GMT+0000 (Coordinated Universal Time)
 *          TiempoExpiracion: Fri Jun 04 2025 15:51:00 GMT+0000 (Coordinated Universal Time)
 *          Localizacion: 0,0
 * 
 */

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Evento_URL:
 *        type: object
 *        required:
 *          - URL
 *        properties:
 *          URL:
 *            type: string
 *            description: URL del sitio Web      
 *        example:
 *          URL: https://api-asistencias.herokuapp.com/
 */

module.exports = route;
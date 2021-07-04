const express = require('express');
const route = express.Router();
const ControllrerHome = require('../Controller/home');

route.post('/login/google', ControllrerHome.signUpGoogle);

/**
 *  @swagger
 *  tags:
 *    name: Inicio de Sesion
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     description: Creación de un nuevo usuario
 *     tags: [Inicio de Sesion]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             items:
 *               $ref: '#/components/schemas/Usuario_SignUp'
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Mensaje de error
 */

route.post('/signup', ControllrerHome.signUpSaveUser);

/**
 * @swagger
 * /signin:
 *   post:
 *     description: Inicio de Sesión
 *     tags: [Inicio de Sesion]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             items:
 *               $ref: '#/components/schemas/Usuario_SignIn'
 *     responses:
 *       '200':
 *          description: Success
 *       '400':
 *          description: Mensaje de error
 */

route.post('/signin', ControllrerHome.signInAuthUser);

/**
 * @swagger
 * /authTokenUser:
 *   get:
 *     description: autentificación del token
 *     tags: [Inicio de Sesion]
 *     parameters:
 *     - name: Usuario-Token
 *       description: Token del usuario
 *       in: header
 *       required: true
 *       type: string
 *     responses:
 *       '200':
 *          description: Success
 *       '400':
 *          description: Mensaje de error
 */

route.get('/authTokenUser', ControllrerHome.authTokenUser);

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Usuario_SignUp:
 *        type: object
 *        required:
 *          - Name
 *          - LastName
 *          - Email
 *          - Password
 *        properties:
 *          Name:
 *            type: string
 *            description: Nombre del Usuario
 *          LastName:
 *            type: string
 *            description: Apellidos del Usuario
 *          Email:
 *            type: string
 *            description: Correo del Usuario
 *          Password:
 *            type: string
 *            description: Contraseña del Usuario
 *        example:
 *          Name: prueba_Name
 *          LastName: prueba_LastName
 *          Email: prueba_Email
 *          Password: prueba_Password
 */

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Usuario_SignIn:
 *        type: object
 *        required:
 *          - Email
 *          - Password
 *        properties:
 *          Email:
 *            type: string
 *            description: Correo del Usuario
 *          Password:
 *            type: string
 *            description: Contraseña del Usuario
 *        example:
 *          Email: prueba_Email
 *          Password: prueba_Password
 */

module.exports = route;
const {Router} = require('express');
const route = Router();
const ControllerAdmin = require('../Controller/admin');

/**
 *  @swagger
 *  tags:
 *    name: Admin
 */

/**
 * @swagger
 * /Admin/:
 *   get:
 *     description: Obtener todos los usuarios existentes
 *     tags: [Admin]
 *     parameters:
 *     - name: Usuario-Token
 *       description: Token del usuario
 *       in: header
 *       required: true
 *       type: string
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Mensaje de error
 */

route.get('/', ControllerAdmin.authUser, ControllerAdmin.getAllUsers);

/**
 * @swagger
 * /Admin/{id}:
 *   put:
 *     description: Actualizar usuario
 *     tags: [Admin]
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
 *               $ref: '#/components/schemas/Usuario_Udate_Admin'
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Mensaje de error
 */

route.put('/:id', ControllerAdmin.authUser, ControllerAdmin.putUsuario);

/**
 * @swagger
 * /Admin/{id}:
 *   delete:
 *     description: Eliminación de usuario
 *     tags: [Admin]
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
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Mensaje de error
 */

route.delete('/:id', ControllerAdmin.authUser, ControllerAdmin.deleteUsuario);

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Usuario_Udate_Admin:
 *        type: object
 *        required:
 *          - NameUsuario
 *          - LastNameUsuario
 *          - TypeUsuario
 *        properties:
 *          NameUsuario:
 *            type: string
 *            description: Nombre del usuario
 *          LastNameUsuario:
 *            type: string
 *            description: apellidos del usuario
 *          TypeUsuario:
 *            type: string
 *            description: localización del usuario 
 *        example:
 *          NameUsuario: prueba_Name
 *          LastNameUsuario: prueba_LastName
 *          TypeUsuario: Alumno
 * 
 */

module.exports = route;
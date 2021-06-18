const {Router} = require('express');
const route = Router();
const ControllerAdmin = require('../Controller/admin');

route.get('/', ControllerAdmin.authUser, ControllerAdmin.getAllUsers);

route.put('/:id', ControllerAdmin.authUser, ControllerAdmin.putUsuario);

route.delete('/:id', ControllerAdmin.authUser, ControllerAdmin.deleteUsuario);

module.exports = route;
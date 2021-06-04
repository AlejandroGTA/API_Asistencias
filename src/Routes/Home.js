const express = require('express');
const route = express.Router();
const ControllrerHome = require('../Controller/home');

route.post('/signup', ControllrerHome.signUpSaveUser);

route.post('/signin', ControllrerHome.signInAuthUser);

route.get('/authTokenUser', ControllrerHome.authTokenUser);

module.exports = route;
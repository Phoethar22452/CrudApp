const express = require('express');
const route = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');
const validator = require('../validator/validator');
/**
 * @description Root Route
 * @method GET /
**/
route.get('/',services.homeRoutes);

/**
 * @description Add User Route
 * @method GET /add-user
**/
route.get('/add-user',services.add_user)

/**
 * @description Update User Route
 * @method GET /update-user
**/
route.get('/update-user',services.update_user)

//API
route.post('/api/users',validator.registerValidator(),controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:id',validator.registerValidator(),controller.update);
route.delete('/api/users/:id',controller.delete);


module.exports = route;
const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const productsController = require('./products-controller');
const productsValidator = require('./products-validator');

const route = express.Router();
 
module.exports = (app) => {
  app.use('/product', route);

  route.get('/', authenticationMiddleware, productsController.getProducts);




   
}

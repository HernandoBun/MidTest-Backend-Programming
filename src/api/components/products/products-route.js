const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const productsController = require('./products-controller');
const productsValidator = require('./products-validator');

const route = express.Router();
 
module.exports = (app) => {
  app.use('/products', route);

  route.get('/', authenticationMiddleware, productsController.getProducts);


  // create Product
  route.post('/',
    authenticationMiddleware,
    celebrate(productsValidator.createProduct),
    productsController.createProduct
    );


   // Get product detail
   route.get('/:id', authenticationMiddleware, productsController.getProduct);


    // Update 
   route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(productsValidator.updateProduct),
    productsController.updateProduct
  );

  //update products stock
  route.put(
    '/:id/update-stock',
    authenticationMiddleware,
    celebrate(productsValidator.updateProductStock),
    productsController.updateProductStock
  );


  // Delete user
  route.delete('/:id',
   authenticationMiddleware, 
   productsController.deleteProduct);

};

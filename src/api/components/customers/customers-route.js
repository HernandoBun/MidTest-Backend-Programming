const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const customersController = require('./customers-controller');
const customersValidator = require('./customers-validator');

const route = express.Router();
 
module.exports = (app) => {
  app.use('/customers', route); // Menggunakan '/customers' sebagai base URL untuk rute pelanggan

  route.get('/', authenticationMiddleware, customersController.getCustomers); // Endpoint untuk mendapatkan semua pelanggan

  route.get('/:id', authenticationMiddleware, customersController.getCustomer); // Endpoint untuk mendapatkan detail pelanggan berdasarkan ID

  route.post('/', // Endpoint untuk membuat pelanggan baru
    authenticationMiddleware,
    celebrate(customersValidator.createCustomer),
    customersController.createCustomer
  );

  route.put('/:id/phone-number', // Endpoint untuk memperbarui nomor telepon pelanggan berdasarkan ID
    authenticationMiddleware,
    celebrate(customersValidator.updateCustomerPNumber), // Menggunakan validator untuk update nomor telepon
    customersController.updateCustomerPNumber // Menggunakan controller  untuk update nomor telepon
  );

  route.delete('/:id', // Endpoint untuk menghapus pelanggan berdasarkan ID
    authenticationMiddleware,
    customersController.deleteCustomer
  );
};

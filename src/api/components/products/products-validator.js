const joi = require('joi');
const { create } = require('lodash');
const { createProduct } = require('./products-repository');

module.exports = {
    createProduct: {
      body: {
        name: joi.string().min(1).max(100).required().label('Name'),
        
      }
    }
};
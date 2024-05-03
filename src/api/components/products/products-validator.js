const joi = require('joi');

module.exports = {
    createProduct: {
      body: {
        name: joi.string().min(1).max(100).required().label('Name'),
        category: joi.string().min(1).max(100).required().label('Category'),
        description: joi.string().min(1).max(100).required().label('Description'),
        price: joi.number().required().label('Price'),
        location: joi.string().min(1).max(100).required().label('Location'),
        sold: joi.number().default(0).label('Sold'),
        stock: joi.number().default(0).label('Stock'),
        createDate: joi.date().default(Date.now).label('CreateDate'),
      },
    },

    updateProduct: {
      body: {
        name: joi.string().min(1).max(100).required().label('Name'),
        price:  joi.number().required().label('Price'),
      },
    },
};
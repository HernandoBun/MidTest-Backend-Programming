const joi = require('joi');

module.exports = {
    createCustomer: {
        body: joi.object({
            firstName: joi.string().min(1).max(100).required().label('First Name'),
            lastName: joi.string().min(1).max(100).required().label('Last Name'),
            email: joi.string().email().required().label('Email'),
            password: joi.string().min(6).required().label('Password'),
            phoneNumber: joi.string().min(1).max(20).required().label('Phone Number'),
            address: joi.object({
                street: joi.string().min(1).max(100).required().label('Street'),
                city: joi.string().min(1).max(100).required().label('City'),
                state: joi.string().min(1).max(100).required().label('State'),
                country: joi.string().min(1).max(100).required().label('Country'),
                zipCode: joi.string().min(1).max(20).required().label('Zip Code')
            }),
            createDate: joi.date().default(Date.now).label('CreateDate'),
        })
    },
    updateCustomerPNumber: {
      body: {
        phoneNumber: joi.string().min(1).max(20).required().label('Phone Number'),
      },
    },
};
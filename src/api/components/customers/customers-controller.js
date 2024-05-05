const customersService = require('./customers-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getCustomers(request, response, next) {
  try {
    const customers = await customersService.getCustomers(); 
    return response.status(200).json(customers);
  } catch (error) {
    return next(error);
  }
}

async function getCustomer(request, response, next) {
  try {
    const customerId = request.params.id;
    const customer = await customersService.getCustomer(customerId);

    if (!customer) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Customer ID Not Found'
      );
    }

    return response.status(200).json(customer);
  } catch (error) {
    return next(error);
  }
}

async function createCustomer(request, response, next) {
  try {
    const { firstName, lastName, email, password, phoneNumber, address, createDate } = request.body;

    const newCustomer = customersService.createCustomer(firstName, lastName, email, password, phoneNumber, address, createDate);

    return response.status(201).json(newCustomer);
  } catch (error) {
    return next(error);
  }
}

async function updateCustomerPNumber(request, response, next) {
  try {
    const customerId = request.params.id;
    const phoneNumber = request.body.phoneNumber; 

    const updatedCustomer = await customersService.updateCustomerPNumber(customerId, phoneNumber); 

    return response.status(200).json(updatedCustomer);
  } catch (error) {
    return next(error);
  }
}

async function deleteCustomer(request, response, next) {
  try {
    const customerId = request.params.id;

    customersService.deleteCustomer(customerId);

    return response.status(200).json({ id: customerId });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomerPNumber,
  deleteCustomer,
};

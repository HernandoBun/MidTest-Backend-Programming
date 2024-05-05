const customerRepository = require('./customers-repository');

/**
 * Get list of customers
 * @returns {Array}
 */
async function getCustomers() {
  const customers = await customerRepository.getCustomers();

  const results = customers.map(customerItem => ({
    id: customerItem.id,
    firstName: customerItem.firstName,
    lastName: customerItem.lastName,
    email: customerItem.email,
    password: customerItem.password,
    phoneNumber: customerItem.phoneNumber,
    address: customerItem.address,
    createDate: customerItem.createDate,
  }));

  return results;
}


/**
 * Get customer detail
 * @param {string} id - customer ID
 * @returns {Object}
 */
async function getCustomer(id) {
  const customer = await customerRepository.getCustomer(id);

  // Customer not found
  if (!customer) {
    return null;
  }

  return {
    id: customer.id,
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    password: customer.password,
    phoneNumber: customer.phoneNumber,
    address: customer.address,
    createDate: customer.createDate,
  };
}


/**
 * Create new customer
 * @param {string} firstName - First name
 * @param {string} lastName - Last name
 * @param {string} email - Email
 * @param {string} password - Password
 * @param {string} phoneNumber - Phone number
 * @param {Object} address - Address object
 * @param {Date} createDate - Create date
 * @returns {boolean}
 */
async function createCustomer(firstName, lastName, email, password, phoneNumber, address, createDate) {
  try {
    await customerRepository.createCustomer(firstName, lastName, email, password, phoneNumber, address, createDate);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Update existing customer
 * @param {string} id - Customer ID
 * @param {string} firstName - First name
 * @param {string} lastName - Last name
 * @param {string} email - Email
 * @param {string} password - Password
 * @param {string} phoneNumber - Phone number
 * @param {Object} address - Address object
 * @param {Date} createDate - Create date
 * @returns {boolean}
 */
async function updateCustomerPNumber(id, phoneNumber) {
  const customer = await customerRepository.getCustomer(id);

  // Customer not found
  if (!customer) {
    return null;
  }

  try {
    await customerRepository.updateCustomerPNumber(id, phoneNumber); 
  } catch (err) {
    return null;
  }

  return true;
}


/**
 * Delete customer
 * @param {string} id - Customer ID
 * @returns {boolean}
 */
async function deleteCustomer(id) {
  const customer = await customerRepository.getCustomer(id);

  // Customer not found
  if (!customer) {
    return null;
  }

  try {
    await customerRepository.deleteCustomer(id);
  } catch (err) {
    return false;
  }

  return true;
}

module.exports = {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomerPNumber,
  deleteCustomer,
};


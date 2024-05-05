const { propertyOf } = require('lodash');
const { Customer } = require('../../../models');
const { phoneNumber } = require('../../../models/customers-schema');


// untuk get semua customers
async function getCustomers(){
  return Customer.find({});
}

// untuk get customers berdasarkan id
async function getCustomer(id){
  return Customer.findById(id);
}

// create customer
async function createCustomer(firstName, lastName, email, password, phoneNumber, address, createDate ) {
  return Product.create({
    firstName,
    lastName,
    email, 
    password, 
    phoneNumber, 
    address, 
    createDate
  });
}

// function update customer
async function updateCustomerPNumber(id, phoneNumber){
  return Customer.updateOne(
    {
      _id: id,
    },
   {
    $set: {
      phoneNumber,
    },
  }
  );
}


// create function delete Product
async function deleteCustomer(id){
  return Customer.deleteOne({ _id: id});
}


module.exports = {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomerPNumber,
  deleteCustomer
};
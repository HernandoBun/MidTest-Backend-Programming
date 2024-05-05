const { propertyOf } = require('lodash');
const { Product } = require('../../../models');
const { stock } = require('../../../models/products-schema');


// untuk get semua products
async function getProducts(){
  return Product.find({});
}

// untuk get products berdasarkan id
async function getProduct(id){
  return Product.findById(id);
}

// create products
async function createProduct(name, category, description, price, location, sold, stock, createDate) {
  return Product.create({
    name,
    category, 
    description, 
    price, 
    location, 
    sold, 
    stock, 
    createDate
  });
}

// create update products
async function updateProduct(id, name, price){
  return Product.updateOne(
    {
      _id: id,
    },
   {
    $set: {
      name,
      price,
    },
  }
  );
}

async function updateProductStock(id, name, updateProductStock){
  return Product.updateOne(
    {
      _id: id,
    },
   {
    $set: {
      name,
      stock,
    },
  }
  );
}


// create function delete Product
async function deleteProduct(id){
  return Product.deleteOne({ _id: id});
}


module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  updateProductStock,
  deleteProduct,
};
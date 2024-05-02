const { propertyOf } = require('lodash');
const { Product } = require('../../../models');


// untuk get semua products
async function getProducts(){
  return Product.find({});
}

// untuk get products berdasarkan id
async function getProduct(id){
  return Product.findById(id);
}

// create products
async function createProduct(name, category, price) {
  return Product.create({
    name,
    category,
    price,
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


// create function delete Product
async function deleteProduct(id){
  return Product.deleteOne({ _id: id});
}


module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
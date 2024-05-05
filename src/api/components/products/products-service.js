const { name, category, price } = require('../../../models/products-schema');
const productsRepository = require('./products-repository');

/**
 * Get list of products
 * @returns {Array}
 */
async function getProducts() {
  const products = await productsRepository.getProducts();

  const results = [];
  for (let i = 0; i < products.length; i += 1) {
    const productItem = products[i];
    results.push({
      id: productItem.id,
      name: productItem.name,
      category: productItem.category,
      description: productItem.description,
      price: productItem.price,
      location: productItem.location,
      sold: productItem.sold,
      stock: productItem.stock,
      createDate: productItem.createDate,
    });
  }

  return results;
}

/**
 * Get user detail
 * @param {string} id - Products ID
 * @returns {Object}
 */
async function getProduct(id) {
  const product = await productsRepository.getProduct(id);

  // User not found
  if (!product) {
    return null;
  }

  return {
    id: products.id,
    name: products.name,
    category: products.category,
    price: products.price,
  };
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} category - Category
 * @param {number} price - Price
 * @returns {boolean}
 */
async function createProduct(name, category, description, price, location, sold, stock, createDate) {
  try {
    await productsRepository.createProduct(name, category, description, price, location, sold, stock, createDate);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Update existing product
 * @param {string} id - Product ID
 * @param {string} name - Name
 * @param {string} category - Category
 * @param {number} price - Price
 * @returns {boolean}
 */
async function updateProduct(id, name, price) {
  const product = await productsRepository.getProduct(id);

  // User not found
  if (!product) {
    return null;
  }

  try {
    await productsRepository.updateProduct(id, name, price);
  } catch (err) {
    return null;
  }

  return true;
}

async function updateProductStock(id, name, stock) {
  const product = await productsRepository.getProduct(id);

  // User not found
  if (!product) {
    return null;
  }

  try {
    await productsRepository.updateProduct(id, name, stock);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete user
 * @param {string} id - product ID
 * @returns {boolean}
 */
async function deleteProduct(id) {
  const product = await productsRepository.getProduct(id);

  // User not found
  if (!product) {
    return null;
  }

  try {
    await productsRepository.deleteProduct(id);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  updateProductStock,
  deleteProduct,
};

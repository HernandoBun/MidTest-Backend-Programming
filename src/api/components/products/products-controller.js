const productsService = require('./products-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { createDate } = require('../../../models/products-schema');

// get all products
async function getProducts(request, response, next) {
  try {
    const search_name = request.query.search_name;
    const search_category = request.query.search_category;

    const products = await productsService.getProducts(search_name,search_category);

    return response.status(200).json(products);
  } catch (error) {
    return next(error);
  }
}

// get product by id
async function getProduct(request, response, next) {
  try {
    const product = await productsService.getProduct(request.params.id);

    //jika id product tidak ada maka throw error  Unprocessable_entity
    if (!product) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Products ID Not Found'
      );
    }

    return response.status(200).json(product);
  } catch (error) {
    return next(error);
  }
}

// create product
async function createProduct(request, response, next) {
  try {
    const name = request.body.name;
    const category = request.body.category;
    const description = request.body.description;
    const price = request.body.price;
    const location = request.body.location;
    const sold = request.body.sold;
    const stock = request.body.stock;
    const createDate = request.body.stock;

    const work = await productsService.createProduct(name, category, description, price, location, sold, stock, createDate);
    if (!work) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to Create Product'
      );
    }

    return response.status(200).json({ name, category, description, price, location, sold, stock, createDate });
  } catch (error) {
    return next(error);
  }
}

// update product

async function updateProduct(request, response, next) {
  try {
    const id = request.params.id;
    const name = request.body.name;
    const price = request.body.price;

    const work = await productsService.updateProduct(id, name, price);
    if (!work) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to Update Product'
      );
    }

    return response.status(200).json({ id , name , price});
  } catch (error) {
    return next(error);
  }
}

async function updateProductStock(request, response, next) {
  try {
    const id = request.params.id;
    const name = request.body.name;
    const stock = request.body.stock;

    const work = await productsService.updateProduct(id, name, stock);
    if (!work) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to Update Product'
      );
    }

    return response.status(200).json({ id, name, stock });
  } catch (error) {
    return next(error);
  }
}

// delete product

async function deleteProduct(request, response, next) {
  try {
    const id = request.params.id;

    const work = await productsService.deleteProduct(id);
    if (!work) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to Delete Product'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  updateProductStock,
  deleteProduct,
};

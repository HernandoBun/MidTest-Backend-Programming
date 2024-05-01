const productsService = require('./products-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

// get all products
async function getProducts(request, response, next) {
  try {
    const products = await productsService.getProducts();

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
    const name = request.body.id;
    const category = request.body.id;
    const price = request.body.id;

    const work = await productsService.createProduct(id, name, category, price);
    if (!work) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to Create Product'
      );
    }

    return response.status(200).json({ name, email });
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

    return response.status(200).json({ id });
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

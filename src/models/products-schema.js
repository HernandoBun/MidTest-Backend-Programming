// const productsSchema = {
//   name: String,
//   category: String,
//   price: Number,
// };
const productsSchema = {
  name: String,
  category: String,
  description: String,
  price: Number,
  location: String,
  sold: {
    type: Number, default:0},
  stock: {
    type: Number, default:0},
  createDate: {
    type: Date, default: Date.now},
};

module.exports = productsSchema;


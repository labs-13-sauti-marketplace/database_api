const db = require("../data/dbConfig");

module.exports = {
  findPrice,
  addProduct,
  get,
  getMarkets,
  getCat,
  getProducts
};

function findPrice(name, product) {
  return db("markets")
    .select("price")
    .where({ name: name, product: product });
}

async function addProduct(product) {
  const [id] = await db('products').insert(product)
  // return 
}

function get() {
  return db('marketplaces')
}

function getMarkets() {
  return db('marketplaces')
}

function getCat() {
  return db('categories')
}

function getProducts() {
  return db('products')
}
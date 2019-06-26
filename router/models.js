const db = require("../data/dbConfig");

module.exports = {
  findPrice,
  addProduct,
  get,
  getMarkets,
  getCat,
  getProducts,
  getMarketplaceCategories
};

function findPrice(name, product) {
  return db("markets")
    .select("price")
    .where({ name: name, product: product });
}

async function addProduct(product) {
  const [id] = await db('products').insert(product)

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

function getMarketplaceCategories(input) {
  return db('categories')

}

function getProducts() {
  return db('products')
  
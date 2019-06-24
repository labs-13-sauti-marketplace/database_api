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
  .select('id', 'name')
  .innerJoin('market_cat', { 'categories.id': 'market_cat.category_id' })
  .where({ 'market_cat.marketplace_id': input });
}

function getProducts() {
  return db('products')
}
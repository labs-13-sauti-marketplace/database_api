const db = require("../data/dbConfig");

module.exports = {
  findPrice,
  addProduct,
  get,
  getMarkets,
  getCat,
  getProducts,
  getMarketplaceCategories, 
  getCountries,
  
};

function findPrice(name, product) {
  return db("markets")
    .select("price")
    .where({ name: name, product: product });
}

async function addProduct(product) {
  const [id] = await db("products").insert(product);
}

function get() {
  return db("marketplaces");
}

function getProductByMarketAndCatId(id) {
  return db("products").where({ marketplaces_id: id } || {categories_id: id});
}
function getMarkets() {
  return db("marketplaces");
}

function getCat() {
  return db('categories')
 
}

function getMarketplaceCategories(input) {
  return db('categories')

}

function getMarketplaceCategories(input) {
  return db("categories");
}

function getProducts() {
  return db('products')
}

async function getCountries() {
  return db('countries')
}

function getMarketByCountryId(id) {
  return db('marketplaces')
    .where({ 'country_id': id })
}


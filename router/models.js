const db = require("../data/dbConfig");

module.exports = {
  findPrice,
  addProduct,
  get,
  getMarkets,
  getCat,
  getProducts,
<<<<<<< HEAD
=======
  getMarketplaceCategories, 
>>>>>>> 5e38da6cb5f5f48ddf9ad906ce69061f7da85076
  getCountries,
  getMarketByCountryId
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
<<<<<<< HEAD

function getCountries() {
  return db('countries')
}

=======
>>>>>>> 5e38da6cb5f5f48ddf9ad906ce69061f7da85076
function getMarkets() {
  return db("marketplaces");
}

function getCat() {
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


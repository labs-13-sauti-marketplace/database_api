const db = require("../data/dbConfig");

module.exports = {
  getMarkets,
  getCat,
  getProducts,
  getMarketplaceCategories, 
  getCountries,
  getMarketByCountryId,
  getProductByMarketAndCatId, 
  addProductInfo
};




function getProductByMarketAndCatId(mId, cId) {
  return db("products")
  .where({ 'marketplace_id': mId })  
  .andWhere({'category_id': cId});
}

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

function getCountries() {
  return db('countries')
}

function getMarketByCountryId(id) {
  return db('marketplaces')
    .where({ 'country_id': id })
}

function addProductInfo(name, mId, cId) {
  return db('products')
  .insert(name, "id")
  .into('products')
  .where({ 'marketplace_id': mId })  
  .andWhere({'category_id': cId})
  .then(([id]) => {
    return getProductByMarketAndCatId(id);
  });
}


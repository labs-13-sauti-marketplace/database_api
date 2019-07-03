const db = require("../data/dbConfig");

module.exports = {
  getMarkets,
  getCat,
  getProducts,
  getMarketplaceCategories,
  getCountries,
  getMarketByCountryId,
  getProductByMarketAndCatId,
  addProductInfo,
  sellerForProduct
};

function getProductByMarketAndCatId(mId, cId) {
  return db("products")
    .where({ 'marketplace_id': mId })
    .andWhere({ 'category_id': cId });
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
  return db("products");
}

function getCountries() {
  return db("countries");
}

function getMarketByCountryId(id) {
  return db("marketplaces").where({ country_id: id });
}

function addProductInfo(name, price, seller, contact_info, marketplace_id, category_id) {
  return db('products')
    .insert({ "name": name, "price": price, "seller": seller, "contact_info": contact_info, "marketplace_id": marketplace_id, "category_id": category_id })
    .into('products')
}

function sellerForProduct(marketplace_id, category_id, id) {
  return db('products')
  .select({ seller, contact_info})
  .where({ "marketplace_id": marketplace_id })  
  .andWhere({ "category_id": category_id })
  .andWhere({ "id": id })
}

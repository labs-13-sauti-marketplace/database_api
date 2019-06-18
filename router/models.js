const db = require("../data/dbConfig");

module.exports = {
  findPrice,
  getMarkets,
  getCat,
  getProducts
};

function findPrice(name, product) {
  return db("markets")
    .select("price")
    .where({ name: name, product: product });

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
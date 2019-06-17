const db = require("../data/dbConfig");

module.exports = {
  findPrice,
  get
};

function findPrice(name, product) {
  return db("markets")
    .select("price")
    .where({ name: name, product: product });

}

function get() {
  return db('marketplaces')
}
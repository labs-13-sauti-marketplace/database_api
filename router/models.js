const db = require("../data/dbConfig");

module.exports = {
  findPrice
};

function findPrice(name, product) {
  return db("markets")
    .select("price")
    .where({ name: name, product: product });

}
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
<<<<<<< HEAD
  const [id] = await db('products').insert(product)}
  // return 
function get() {
  return db('marketplaces')
}
=======
  const [id] = await db('products').insert(product)

}


function get() {
  return db('marketplaces')
}

>>>>>>> 3d9bd17ebbda427f5b88e1faf9513ea21460021f
function getMarkets() {
  return db('marketplaces')
}

function getCat() {
  return db('categories')
}

function getProducts() {
  return db('products')
}
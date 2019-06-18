const db = require("../data/dbConfig");

module.exports = {
  findPrice,
<<<<<<< HEAD
<<<<<<< HEAD
  addProduct,
  
=======
  get
>>>>>>> 418a25317f54fb011715cbc1b495d963efb0da7f
=======
  getMarkets,
  getCat,
  getProducts
>>>>>>> 60fc1eae35b2bd9fc73cc5313c6a450405ff07c7
};

function findPrice(name, product) {
  return db("markets")
    .select("price")
    .where({ name: name, product: product });

}

<<<<<<< HEAD
<<<<<<< HEAD
async function addProduct(product) {
  const [id] = await db('products').insert(product)
  // return 
=======
function get() {
  return db('marketplaces')
>>>>>>> 418a25317f54fb011715cbc1b495d963efb0da7f
=======
function getMarkets() {
  return db('marketplaces')
}

function getCat() {
  return db('categories')
}

function getProducts() {
  return db('products')
>>>>>>> 60fc1eae35b2bd9fc73cc5313c6a450405ff07c7
}
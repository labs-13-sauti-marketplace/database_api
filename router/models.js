const db = require("../data/dbConfig");

module.exports = {
  findPrice,
<<<<<<< HEAD
  addProduct,
  
=======
  get
>>>>>>> 418a25317f54fb011715cbc1b495d963efb0da7f
};

function findPrice(name, product) {
  return db("markets")
    .select("price")
    .where({ name: name, product: product });

}

<<<<<<< HEAD
async function addProduct(product) {
  const [id] = await db('products').insert(product)
  // return 
=======
function get() {
  return db('marketplaces')
>>>>>>> 418a25317f54fb011715cbc1b495d963efb0da7f
}
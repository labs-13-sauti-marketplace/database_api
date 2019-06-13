const db = require("../data/dbConfig");

module.exports = {
  findPrice,
  addProduct,
  
};

function findPrice(name, product) {
  return db("markets")
    .select("price")
    .where({ name: name, product: product });

}

async function addProduct(product) {
  const [id] = await db('products').insert(product)
  // return 
}
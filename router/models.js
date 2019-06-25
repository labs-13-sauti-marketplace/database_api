const db = require("../data/dbConfig");

module.exports = {
  findPrice,
  addProduct,
  get,
  getMarkets,
  getCat,
  getProducts,
  getSellers
};

function findPrice(name, product) {
  return db("markets")
    .select("price")
    .where({ name: name, product: product });
}

async function addProduct(product) {
  const [id] = await db('products').insert(product)

}

function get() {
  return db('marketplaces')
}

function getMarkets() {
  return db('marketplaces')
}

function getCat() {
  return db('categories')
}

async function getProducts() {
  const products = await db('products')
  // add a temporary "seller_id" -- we need to add this to the actual database
  return products.map(product => {
    product.seller_id = product.id
    return product
  })
}

function getSellers () {
  const sellers = []
  for (let i=0; i<100; i++) {
    sellers.push({
      id: i,
      name: `This Guy ${i}`,
      phone: '555-555-${i}${i}${i}${i}'
    })
  }
  return sellers
}
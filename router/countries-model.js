const db = require('../data/dbConfig');

module.exports = {
    getcon,
    findById,
    add,
    update,
    remove
}

function getcon() {
    return db("countries")
}


function findById(id) {
    return db("countries")
        .where({ id })
        .first()
}

function add(country) {
    // passing 'id' as the second Param is recommended to ensure the id is returned
    // when connecting to other DBMS like Postgres
    return db("countries").insert(recipe, "id")
}

function update(id, changes) {
    return db("countries")
        .where({ id })
        .update(changes)
}

function remove(id) {
    return db("countries")
        .where({ id })
        .del()
}

function getMarkets() {
    return db('marketplaces')
}

async function categories(){
    const result = await models.getCat()
    return result
  }
  
  async function products(){
    const result = await models.getProducts()
    return result
  }
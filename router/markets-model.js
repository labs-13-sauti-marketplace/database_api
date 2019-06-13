const db = require('./data/dbConfig');

module.exports = {
    get,
    findById,
    add,
    update,
    remove
}

function get() {
    return db("markets")
}

function findById(id) {
    return db("markets")
        .where({ id })
        .first()
}

function add(market) {
    // passing 'id' as the second Param is recommended to ensure the id is returned
    // when connecting to other DBMS like Postgres
    return db("markets").insert(recipe, "id")
}

function update(id, changes) {
    return db("markets")
        .where({ id })
        .update(changes)
}

function remove(id) {
    return db("markets")
        .where({ id })
        .del()
}
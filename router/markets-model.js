const db = require('../data/dbConfig');

module.exports = {
   findById,
   
}
function findById(id) {
    return db("countries")
        .where({ id })
        .first()
}
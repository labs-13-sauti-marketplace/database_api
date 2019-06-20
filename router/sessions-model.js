const db = require('../data/dbConfig');

module.exports = {
    getses,
    findByIdses,
    addses,
    updateses,
    removeses
}

function getses() {
    return db("sessions")
}


function findByIdses(id) {
    return db("sessions")
        .where({ id })
        .first()
}

function addses(session) {
   
    return db("sessions").insert(recipe, "id")
}

function updateses(id, changes) {
    return db("sessions")
        .where({ id })
        .update(changes)
}

function removeses(id) {
    return db("sessions")
        .where({ id })
        .del()
}


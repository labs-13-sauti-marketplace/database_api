
exports.up = function (knex, Promise) {
  return knex.schema.createTable('markets', tbl => {
    tbl.increments()
    tbl.string("name").notNullable()
    tbl.string("country").notNullable()
    tbl.string("category").notNullable()
    tbl.string("product").notNullable()
    tbl.string("price").notNullable()
    tbl.string("seller").notNullable()
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('markets')
};

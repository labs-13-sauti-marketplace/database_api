
exports.up = function (knex, Promise) {
  return knex.schema.createTable('prices', tbl => {
    tbl.increments()
    tbl
      .string('price', 128)
      .notNullable()
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('prices')
};

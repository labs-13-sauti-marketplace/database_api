
exports.up = function (knex, Promise) {
  return knex.schema.createTable('categories', tbl => {
    tbl.increments().primary()
    tbl
      .string('name', 128)
      .notNullable()
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('categories')
};

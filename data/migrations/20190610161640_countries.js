
exports.up = function (knex, Promise) {
  return knex.schema.createTable('countries', tbl => {
    tbl.increments().primary()
    tbl
      .string('name', 128)
      .notNullable()
      .unique()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('countries')
};

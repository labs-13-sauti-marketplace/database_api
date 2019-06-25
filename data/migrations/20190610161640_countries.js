
exports.up = function (knex, Promise) {
  return knex.schema.createTable('countries', tbl => {
    tbl.increments('id').primary()
    tbl
      .string('name', 128)
      .notNullable()
      .unique()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('countries')
};

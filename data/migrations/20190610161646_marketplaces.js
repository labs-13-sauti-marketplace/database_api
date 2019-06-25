
exports.up = function (knex, Promise) {
  return knex.schema.createTable('marketplaces', tbl => {
    tbl.increments()
    tbl
      .string('name', 128)
      .notNullable()
    tbl
      .foreign('country_id')
      .references('countries.id')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('marketplaces')
};

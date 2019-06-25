
exports.up = function (knex, Promise) {
  return knex.schema.createTable('marketplaces', tbl => {
    tbl.increments().primary()
    tbl
      .string('name', 128)
      .notNullable()
      .unique()
    tbl
    tbl
      .integer('country_id')
      .unsigned()
      .references('id')
      .inTable('countries')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('marketplaces')
};


exports.up = function (knex, Promise) {
  return knex.schema.createTable('marketplaces', tbl => {
    tbl.increments()
    tbl
      .string('name', 128)
      .notNullable()
      .unique()
    tbl
      .integer('border_id')
      .unsigned()
      .references('id')
      .inTable('border-crossings')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
}
exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('marketplaces')
};

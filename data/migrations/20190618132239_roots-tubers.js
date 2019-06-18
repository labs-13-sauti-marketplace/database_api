
exports.up = function (knex, Promise) {
  return knex.schema.createTable('roots-tubers', tbl => {
    tbl.increments()
    tbl
      .string('name', 128)
      .notNullable()
    tbl
      .integer('category_id')
      .unsigned()
      .references('id')
      .inTable('categories')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('roots-tubers')
};

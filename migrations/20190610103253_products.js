
exports.up = function (knex, Promise) {
  return knex.schema.createTable('products', tbl => {
    tbl.increments()
    tbl
      .string('name', 128)
      .notNullable()
      .unique()
    tbl
      .string('country', 128)
      .notNullable()
      .unique()
    tbl
      .string('marketplace', 128)
      .notNullable()
      .unique()
    tbl
      .string('category', 128)
      .notNullable()
      .unique()
    tbl
      .string('sub-category', 128)
      .notNullable()
      .unique()
    tbl
      .decimal('price', 128)
      .notNullable()
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('products')
};
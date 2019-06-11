
exports.up = function (knex, Promise) {
    return knex.schema.createTable('products', tbl => {
      tbl.increments()
      tbl
        .string('name', 128)
        .notNullable()
      tbl
        .string('country', 128)
        .notNullable()
      tbl
        .string('marketplace', 128)
        .notNullable()
      tbl
        .string('category', 128)
        .notNullable()
      tbl
        .string('sub-category', 128)
        .notNullable()
      tbl
        .decimal('price', 128)
        .notNullable()
      tbl
        .integer('subcat_id')
        .unsigned()
        .references('id')
        .inTable('sub-categories')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
  };
  
  exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('products')
  };

exports.up = function (knex, Promise) {
  return knex.schema.createTable("products", tbl => {
    tbl.increments('id').primary()
    tbl.string("name", 128).notNullable();
    tbl.string("price", 128)
    tbl.string('seller', 128)
    tbl
      .integer('marketplace_id')
      .unsigned()
      .references('id')
      .inTable('marketplaces')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    tbl
      .integer('category_id')
      .unsigned()
      .references('id')
      .inTable('categories')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("products");
};
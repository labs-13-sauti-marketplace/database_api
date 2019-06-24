exports.up = function (knex, Promise) {
  return knex.schema.createTable("products", tbl => {
    tbl.increments();
    tbl.string("name", 128).notNullable();
    tbl.string('country', 128)
    tbl.string("price", 128).notNullable();
    tbl.string('marketplace', 128).notNullable()
    tbl.string('category', 128).notNullable()
    tbl.string('seller', 128).notNullable()
    tbl
      .integer('category_id')
      .unsigned()
      .references('id')
      .inTable('categories')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    tbl
      .integer('marketplace_id')
      .unsigned()
      .references('id')
      .inTable('marketplaces')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("products");
};



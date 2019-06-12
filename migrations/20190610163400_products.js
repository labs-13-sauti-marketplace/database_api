exports.up = function(knex, Promise) {
  return knex.schema.createTable("products", tbl => {
    tbl.increments();
    tbl.string("name", 128).notNullable();
    tbl.string("price", 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("products");
};



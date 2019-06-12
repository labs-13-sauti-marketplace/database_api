exports.up = function(knex, Promise) {
  return knex.schema.createTable("sessions", tbl => {
    tbl.increments();
    tbl
      .string("sessionId", 12)
      .notNullable()
      .unique();
    tbl
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("sessions");
};

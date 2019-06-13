exports.up = function (knex, Promise) {
  return knex.schema.createTable("sessions", tbl => {
    tbl.increments();
    tbl
      .string("sessionId", 128)
      .notNullable()
      .unique();
    tbl
      .string("phoneNumber", 15)
      .notNullable()
    tbl
      .string('text', 160)
      .notNullable()
    tbl
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("sessions");
};

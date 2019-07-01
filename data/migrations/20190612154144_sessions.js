exports.up = function (knex, Promise) {
  return knex.schema.createTable("sessions", tbl => {
    tbl.increments();
    tbl
      .string("sessionId", 128)
      .notNullable()
    tbl
      .string("phoneNumber", 15)
      .notNullable()
    tbl
      .string('text', 160)
      .notNullable()
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("sessions");
};


exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', users => {
    users.increments();
    users
      .string('name', 255)
      .notNullable()
      .unique();
    users
      .string('phoneNumber')
      .notNullable()
      .unique()
  })

};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
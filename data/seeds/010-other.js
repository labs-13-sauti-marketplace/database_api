
exports.seed = function (knex, Promise) {
  return knex('table_name').insert([
    { name: 'Coffee 110kes' },
  ]);
};

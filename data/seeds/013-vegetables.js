
exports.seed = function (knex, Promise) {
  return knex('table_name').insert([
    { name: 'Peas 110kes' },
  ]);
};


exports.seed = function (knex, Promise) {
  return knex('fruits').insert([
    { name: 'Bananas 110kes' }
  ]);
};

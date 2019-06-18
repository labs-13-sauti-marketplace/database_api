
exports.seed = function (knex, Promise) {
  return knex('other').insert([
    { name: 'Coffee 110kes' },
  ]);
};

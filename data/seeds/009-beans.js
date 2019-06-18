
exports.seed = function (knex, Promise) {
  return knex('beans').insert([
    { name: 'Agwedde beans 110kes' },
  ]);
};

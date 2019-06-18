
exports.seed = function (knex, Promise) {
  return knex('vegetables').insert([
    { name: 'Peas 110kes' },
  ]);
};

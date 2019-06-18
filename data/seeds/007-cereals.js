
exports.seed = function (knex, Promise) {
  return knex('cereals').insert([
    { name: 'Maize 110kes' },
    { name: 'Millet 110kes' },
    { name: 'White Rice 110kes' },
  ]);
};

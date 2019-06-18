
exports.seed = function (knex, Promise) {
  return knex('roots-tubers').insert([
    { name: 'Sweet potato 110kes' },
  ]);
};


exports.seed = function (knex, Promise) {
  return knex('roots_tubers').insert([
    { name: 'Sweet potato 110kes' },
  ]);
};


exports.seed = function (knex, Promise) {
  return knex('seeds-nuts').insert([
    { id: 1, colName: 'Sunflower seeds 110kes' },
  ]);
};

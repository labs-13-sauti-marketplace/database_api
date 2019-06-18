
exports.seed = function (knex, Promise) {
  return knex('seeds_nuts').insert([
    { name: 'Sunflower seeds 110kes' },
  ]);
};

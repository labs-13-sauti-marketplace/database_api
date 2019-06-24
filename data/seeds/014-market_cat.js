
exports.seed = function (knex, Promise) {
  return knex('market_cat').insert([
    { id: 1, marketplace_id: 4, category_id: 3 },
    { id: 2, marketplace_id: 4, category_id: 4 },
    { id: 3, marketplace_id: 4, category_id: 7 },
    { id: 4, marketplace_id: 6, category_id: 1 },
    { id: 5, marketplace_id: 6, category_id: 2 },
    { id: 6, marketplace_id: 7, category_id: 8 },
    { id: 7, marketplace_id: 7, category_id: 1 },
    { id: 8, marketplace_id: 7, category_id: 2 },
    { id: 9, marketplace_id: 7, category_id: 5 },
    { id: 10, marketplace_id: 8, category_id: 1 },
    { id: 11, marketplace_id: 8, category_id: 3 },
    { id: 12, marketplace_id: 8, category_id: 5 },
    { id: 13, marketplace_id: 8, category_id: 6 },
    { id: 14, marketplace_id: 8, category_id: 7 }
  ]);
};

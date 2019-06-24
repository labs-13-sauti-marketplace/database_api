
exports.seed = function (knex, Promise) {
  return knex('market_cat').insert([
    { marketplace_id: 4, category_id: 3 },
    { marketplace_id: 4, category_id: 4 },
    { marketplace_id: 4, category_id: 7 },
    { marketplace_id: 6, category_id: 1 },
    { marketplace_id: 6, category_id: 2 },
    { marketplace_id: 7, category_id: 8 },
    { marketplace_id: 7, category_id: 1 },
    { marketplace_id: 7, category_id: 2 },
    { marketplace_id: 7, category_id: 5 },
    { marketplace_id: 8, category_id: 1 },
    { marketplace_id: 8, category_id: 3 },
    { marketplace_id: 8, category_id: 5 },
    { marketplace_id: 8, category_id: 6 },
    { marketplace_id: 8, category_id: 7 }
  ]);
};

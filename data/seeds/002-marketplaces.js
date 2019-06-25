exports.seed = function (knex, Promise) {
  return knex("marketplaces").insert([
    { name: "Busia", country_id: '1' }, // 1
    { name: "Tororo", country_id: '2' }, // 2
    { name: "Mbale", country_id: '2' }, // 3
    { name: "Eldoret", country_id: '1' }, // 4
    { name: "Kisumu", country_id: '1' }, // 5
    { name: "Soroti", country_id: '2' }, // 6
    { name: "Bungoma", country_id: '1' }, // 7
    { name: "Kampala", country_id: '2' } // 8
  ]);
};

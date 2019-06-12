exports.seed = function (knex, Promise) {
  return knex('marketplaces').insert([
    { name: 'Busia' }, // 1
    { name: 'Eldoret' }, // 2
    { name: 'Kampala' }, // 3
    { name: 'Kisumu' }, // 4
    { name: 'Mbale' }, // 5
    { name: 'Owino' }, // 6
    { name: 'Soroti' }, // 7
    { name: 'Tororo' }, // 8
  ]);
};


exports.seed = function (knex, Promise) {
  return knex('animal_products').insert([
    { name: 'White eggs 110kes' },
    { name: 'Exotic eggs 110kes' },
    { name: 'Brown eggs 110kes' },
    { name: 'Milk 110kes' },
    { name: 'Nile perch 110kes' },
    { name: 'Tilapia 110kes' },
    { name: 'Processed honey 110kes' },
    { name: 'Unprocessed honey 110kes' },
    { name: 'Beef 110kes' },
    { name: 'Goat meat 110kes' },
    { name: 'Pork 110kes' },
    { name: 'Local chicken 110kes' },
    { name: 'Turkey 110kes' },
  ]);
};

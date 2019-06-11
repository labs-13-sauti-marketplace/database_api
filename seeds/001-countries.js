
exports.seed = function (knex, Promise) {
  return knex('countries').insert([
    { name: 'Kenya' }, // 1
    { name: 'Uganda' }, // 2
    { name: 'Burundi' }, // 3
    { name: 'DRC' }, // 4
    { name: 'Malawi' }, // 5
    { name: 'Rwanda' }, // 6
    { name: 'Tanzania' }, // 7
    { name: 'SSD' } // 8
  ]);
};

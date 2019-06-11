
exports.seed = function (knex, Promise) {
  return knex('table_name').insert([
    { name: 'Bungoma', country_id: '1' }, // 1
    { name: 'Busia', country_id: '1' }, // 2
    { name: 'Eldoret', country_id: '1' }, // 3
    { name: 'Embu', country_id: '1' }, // 4
    { name: 'Garisa', country_id: '1' }, // 5
    { name: 'Garissa', country_id: '1' }, // 6
    { name: 'Isiolo', country_id: '1' }, // 7
    { name: 'Kajiado', country_id: '1' }, // 8
    { name: 'Kakamega', country_id: '1' }, // 9
    { name: 'Kisii', country_id: '1' }, // 10
    { name: 'Kisumu', country_id: '1' }, // 11
    { name: 'Kitale', country_id: '1' }, // 12
    { name: 'Kitui', country_id: '1' }, // 13
    { name: 'Loitoktok', country_id: '1' }, // 14
    { name: 'Machakos', country_id: '1' }, // 15
    { name: 'Makueni', country_id: '1' }, // 16
    { name: 'Malindi', country_id: '1' }, // 17
    { name: 'Meru', country_id: '1' }, // 18
    { name: 'Mombasa', country_id: '1' }, // 19
    { name: 'Nairobi', country_id: '1' }, // 20
    { name: 'Nakuru', country_id: '1' }, // 21
    { name: 'Oloitoktok', country_id: '1' }, // 22
    { name: 'Wajir', country_id: '1' }, // 23
  ]);
};

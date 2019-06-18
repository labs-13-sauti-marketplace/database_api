
exports.seed = function (knex, Promise) {
  return knex('markets').insert([
    {
      name: 'Busia',
      category: 'Animal Products',
      product: 'white eggs',
      price: '122.333kes/kg'
    },
    {
      name: 'Busia',
      category: 'Rice',
      product: 'brown rice',
      price: '112.888kes/kg'
    },
    {
      name: 'Kisumu',
      category: 'Vegetables',
      product: 'Peas',
      price: '211.333kes/kg'
    },
    {
      name: 'Soroti',
      category: 'Other',
      product: 'Coffee',
      price: '344.543kes/kg'
    },
    {
      name: 'Soroti',
      category: 'Roots & Tubers',
      product: 'white potatoes',
      price: '239.443kes/kg'
    },
    {
      name: 'Kampala',
      category: 'Rice',
      product: 'brown rice',
      price: '114.888kes/kg'
    },
  ]);
};

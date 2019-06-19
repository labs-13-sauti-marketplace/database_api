
exports.seed = function (knex, Promise) {
  return knex('markets').insert([
    {
      name: 'Busia',
      country: 'Kenya',
      category: 'Animal Products',
      product: 'white eggs',
      price: '122.333kes/kg',
      seller: 'Thomas Smith'
    },
    {
      name: 'Busia',
      country: 'Kenya',
      category: 'Cereals',
      product: 'brown rice',
      price: '112.888kes/kg',
      seller: 'Thomas Smith'
    },
    {
      name: 'Busia',
      country: 'Kenya',
      category: 'Cereals',
      product: 'white rice',
      price: '112.888kes/kg',
      seller: 'Thomas Smith'
    },
    {
      name: 'Busia',
      country: 'Kenya',
      category: 'Roots & Tubers',
      product: 'Sweet Potatoes',
      price: '112.888kes/kg',
      seller: 'Thomas Smith'
    },
    {
      name: 'Busia',
      country: 'Kenya',
      category: 'Seeds & Nuts',
      product: 'Groundnuts',
      price: '112.888kes/kg',
      seller: 'Marta Johnson'
    },
    {
      name: 'Busia',
      country: 'Kenya',
      category: 'Seeds & Nuts',
      product: 'Sunflower Seed Cake',
      price: '112.888kes/kg',
      seller: 'Marta Johnson'
    },
    {
      name: 'Busia',
      country: 'Kenya',
      category: 'Vegetables',
      product: 'Spring Onions',
      price: '112.888kes/kg',
      seller: 'Marta Johnson'
    },
    {
      name: 'Kisumu',
      country: 'Kenya',
      category: 'Vegetables',
      product: 'Peas',
      price: '211.333kes/kg',
      seller: 'Rob Quail'
    },
    {
      name: 'Kisumu',
      country: 'Kenya',
      category: 'Vegetables',
      product: 'Carrots',
      price: '211.333kes/kg',
      seller: 'Rob Quail'
    },
    {
      name: 'Kisumu',
      country: 'Kenya',
      category: 'Vegetables',
      product: 'Ginger',
      price: '211.333kes/kg',
      seller: 'Rob Quail'
    },
    {
      name: 'Kisumu',
      country: 'Kenya',
      category: 'Other',
      product: 'Coffee (Arabica)',
      price: '211.333kes/kg',
      seller: 'Carl Best'
    },
    {
      name: 'Kisumu',
      country: 'Kenya',
      category: 'Other',
      product: 'Tobacco',
      price: '211.333kes/kg',
      seller: 'Carl Best'
    },
    {
      name: 'Kisumu',
      country: 'Kenya',
      category: 'Other',
      product: 'Unprocessed Tea',
      price: '211.333kes/kg',
      seller: 'Carl Best'
    },
    {
      name: 'Soroti',
      country: 'Uganda',
      category: 'Fruits',
      product: 'Ripe Bananas',
      price: '344.543kes/kg',
      seller: 'Beku Momda'
    },
    {
      name: 'Soroti',
      country: 'Uganda',
      country: 'Kenya',
      category: 'Fruits',
      product: 'Pawpaw',
      price: '239.443kes/kg',
      seller: 'Beku Momda'
    },
    {
      name: 'Kampala',
      country: 'Kenya',
      category: 'Beans',
      product: 'brown rice',
      price: '114.888kes/kg',
      seller: 'Paulo Colaba'
    },
    {
      name: 'Kampala',
      country: 'Kenya',
      category: 'Beans',
      product: 'Beans Rosecoco',
      price: '114.888kes/kg',
      seller: 'Paulo Colaba'
    },
    {
      name: 'Kampala',
      country: 'Kenya',
      category: 'Beans',
      product: 'Red Beans',
      price: '114.888kes/kg',
      seller: 'Paulo Colaba'
    },
    {
      name: 'Kampala',
      country: 'Kenya',
      category: 'Beans',
      product: 'Kidney Beans',
      price: '114.888kes/kg',
      seller: 'Paulo Colaba'
    },
  ]);
};

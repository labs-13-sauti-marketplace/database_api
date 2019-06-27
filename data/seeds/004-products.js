exports.seed = function (knex, Promise) {
  return knex("products").insert([
    {
      name: "white eggs",
      price: "110kes",
      seller: "Tomba Manu",
      marketplace_id: '1',
      category_id: '1'
    },
    {
      name: "exotic eggs",
      price: "110kes",
      seller: "Tomba Manu",
      marketplace_id: '1',
      category_id: '1'
    },
    {
      name: "brown eggs",
      price: "110kes",
      seller: "Tomba Manu",
      marketplace_id: '1',
      category_id: '1'
    },
    {
      name: "Barley",
      price: "156kes/kg",
      seller: "Marta",
      marketplace_id: '1',
      category_id: '2'
    },
    {
      name: "Wheat",
      price: "152kes/kg",
      seller: "Marta",
      marketplace_id: '1',
      category_id: '2'
    },
    {
      name: "Black Beans",
      price: "112kes/kg",
      seller: "Marta",
      marketplace_id: '1',
      category_id: '4'
    },
    {
      name: "Red Beans",
      price: "114kes/kg",
      seller: "Marta",
      marketplace_id: '1',
      category_id: '4'
    },
    {
      name: "Sun Dried Cassava",
      price: "159kes/kg",
      seller: "Marta",
      marketplace_id: '1',
      category_id: '6'
    },
    {
      name: "Sweet Potatoes",
      price: "159kes/kg",
      seller: "Marta",
      marketplace_id: '1',
      category_id: '6'
    },
    {
      name: "Cabbages",
      price: "159kes/kg",
      seller: "Kara",
      marketplace_id: '1',
      category_id: '8'
    },
    {
      name: "Cauliflower",
      price: "159kes/kg",
      seller: "Kara",
      marketplace_id: '1',
      category_id: '8'
    },
    {
      name: "Spring Onions",
      price: "159kes/kg",
      seller: "Kara",
      marketplace_id: '1',
      category_id: '8'
    },

    {
      name: "Apple Bananas",
      price: "159kes",
      seller: "Raffa",
      marketplace_id: '2',
      category_id: '3'
    },
    {
      name: "Passion Fruits",
      price: "159kes",
      seller: "Raffa",
      marketplace_id: '2',
      category_id: '3'
    },
    {
      name: "Lemons",
      price: "159kes",
      seller: "Raffa",
      marketplace_id: '2',
      category_id: '3'
    },
    {
      name: "Groundnuts",
      price: "159kes",
      seller: "Raffa",
      marketplace_id: '2',
      category_id: '7'
    },
    {
      name: "Simsim",
      price: "159kes",
      seller: "Raffa",
      marketplace_id: '2',
      category_id: '7'
    },
    {
      name: "Sunflower Seed",
      price: "159kes",
      seller: "Raffa",
      marketplace_id: '2',
      category_id: '7'
    },
    {
      name: "Carrots",
      price: "159kes",
      seller: "Raffa",
      marketplace_id: '2',
      category_id: '8'
    },
    {
      name: "Lettuce",
      price: "159kes",
      seller: "Raffa",
      marketplace_id: '2',
      category_id: '8'
    },
    {
      name: "Green Peas",
      price: "159kes",
      seller: "Raffa",
      marketplace_id: '2',
      category_id: '8'
    },
    {
      name: "Tomatoes",
      price: "159kes",
      seller: "Raffa",
      marketplace_id: '2',
      category_id: '8'
    },

    {
      name: "milk",
      price: "110kes",
      seller: "Tomba Manu",
      marketplace_id: '3',
      category_id: '1'
    },
    {
      name: "nile perch",
      price: "110kes",
      seller: "Tomba Manu",
      marketplace_id: '3',
      category_id: '1'
    },
    {
      name: "tilapia",
      price: "110kes",
      seller: "Tomba Manu",
      marketplace_id: '3',
      category_id: '1'
    },
    {
      name: "Coffee (Arabica)",
      price: "110kes",
      seller: "Peter",
      marketplace_id: '3',
      category_id: '5'
    },
    {
      name: "Tobacco",
      price: "110kes",
      seller: "Peter",
      marketplace_id: '3',
      category_id: '5'
    },
    {
      name: "Unprocessed Vanilla",
      price: "110kes",
      seller: "Peter",
      marketplace_id: '3',
      category_id: '5'
    },

    {
      name: "Beef",
      price: "110kes",
      seller: "Chapala",
      marketplace_id: '4',
      category_id: '1'
    },
    {
      name: "Pork",
      price: "110kes",
      seller: "Chapala",
      marketplace_id: '4',
      category_id: '1'
    }, {
      name: "Kidney Beans",
      price: "110kes",
      seller: "Chapala",
      marketplace_id: '4',
      category_id: '4'
    },
    {
      name: "White Beans",
      price: "110kes",
      seller: "Chapala",
      marketplace_id: '4',
      category_id: '4'
    },
    {
      name: "Cassava Fresh",
      price: "110kes",
      seller: "Chapala",
      marketplace_id: '4',
      category_id: '6'
    }, {
      name: "White Irish Potatoes",
      price: "110kes",
      seller: "Chapala",
      marketplace_id: '4',
      category_id: '6'
    },

    {
      name: "processed honey",
      price: "110kes",
      seller: "Tomba Manu",
      marketplace_id: '5',
      category_id: '1'
    },
    {
      name: "unprocessed honey",
      price: "110kes",
      seller: "Tomba Manu",
      marketplace_id: '5',
      category_id: '1'
    },
    {
      name: "Local Chicken",
      price: "110kes",
      seller: "Tomba Manu",
      marketplace_id: '5',
      category_id: '1'
    },
    {
      name: "processed honey",
      price: "107kes",
      seller: "Borro White",
      marketplace_id: '5',
      category_id: '1'
    },
    {
      name: "unprocessed honey",
      price: "108kes",
      seller: "Borro White",
      marketplace_id: '5',
      category_id: '1'
    },
    {
      name: "Millet Flour",
      price: "110kes",
      seller: "Borro White",
      marketplace_id: '5',
      category_id: '2'
    },
    {
      name: "Millet Grain",
      price: "107kes",
      seller: "Borro White",
      marketplace_id: '5',
      category_id: '2'
    },
    {
      name: "Pearl Millet",
      price: "108kes",
      seller: "Borro White",
      marketplace_id: '5',
      category_id: '2'
    },
    {
      name: "Kilombero Rice",
      price: "110kes",
      seller: "Borro White",
      marketplace_id: '5',
      category_id: '2'
    },
    {
      name: "Mbeya Rice",
      price: "108kes",
      seller: "Borro White",
      marketplace_id: '5',
      category_id: '2'
    },
    {
      name: "Morogoro Rice",
      price: "115kes",
      seller: "Borro White",
      marketplace_id: '5',
      category_id: '2'
    },

    {
      name: "Apple Bananas",
      price: "110kes",
      seller: "Cassandra Bella",
      marketplace_id: '6',
      category_id: '3'
    },
    {
      name: "Cooking Bananas",
      price: "110kes",
      seller: "Cassandra Bella",
      marketplace_id: '6',
      category_id: '3'
    },
    {
      name: "Lemons",
      price: "110kes",
      seller: "Cassandra Bella",
      marketplace_id: '6',
      category_id: '3'
    },
    {
      name: "Limes",
      price: "110kes",
      seller: "Cassandra Bella",
      marketplace_id: '6',
      category_id: '3'
    },
    {
      name: "Unprocessed Tea",
      price: "110kes",
      seller: "Perry Como",
      marketplace_id: '6',
      category_id: '5'
    },
    {
      name: "Cassava Chips",
      price: "110kes",
      seller: "Perry Como",
      marketplace_id: '6',
      category_id: '6'
    },
    {
      name: "Red Irish Potatoes",
      price: "110kes",
      seller: "Perry Como",
      marketplace_id: '6',
      category_id: '6'
    },
    {
      name: "Simsim",
      price: "110kes",
      seller: "Perry Como",
      marketplace_id: '6',
      category_id: '7'
    },
    {
      name: "Sunflower Seed Cake",
      price: "110kes",
      seller: "Momo Manu",
      marketplace_id: '6',
      category_id: '7'
    },
    {
      name: "Ginger",
      price: "110kes",
      seller: "Momo Manu",
      marketplace_id: '6',
      category_id: '8'
    },
    {
      name: "Kale",
      price: "110kes",
      seller: "Momo Manu",
      marketplace_id: '6',
      category_id: '8'
    },
    {
      name: "Pigeon Peas",
      price: "110kes",
      seller: "Momo Manu",
      marketplace_id: '6',
      category_id: '8'
    },

    {
      name: "turkey",
      price: "110kes",
      seller: "Barillo Johns",
      marketplace_id: '7',
      category_id: '1'
    },
    {
      name: "Local Chicken",
      price: "110kes",
      seller: "Barillo Johns",
      marketplace_id: '7',
      category_id: '1'
    },
    {
      name: "Nambale Beans",
      price: "110kes",
      seller: "Barillo Johns",
      marketplace_id: '7',
      category_id: '4'
    },
    {
      name: "Red Beans",
      price: "110kes",
      seller: "Barillo Johns",
      marketplace_id: '7',
      category_id: '4'
    },
    {
      name: "Soya Beans",
      price: "110kes",
      seller: "Barillo Johns",
      marketplace_id: '7',
      category_id: '4'
    },
    {
      name: "Yellow Beans",
      price: "110kes",
      seller: "Barillo Johns",
      marketplace_id: '7',
      category_id: '4'
    },
    {
      name: "Coffee (Arabica)",
      price: "110kes",
      seller: "Barillo Johns",
      marketplace_id: '7',
      category_id: '5'
    },
    {
      name: "Tobacco",
      price: "110kes",
      seller: "Barillo Johns",
      marketplace_id: '7',
      category_id: '5'
    },
    {
      name: "Brinjal/Eggplant",
      price: "110kes",
      seller: "Barillo Johns",
      marketplace_id: '7',
      category_id: '8'
    },
    {
      name: "Capsicums",
      price: "110kes",
      seller: "Barillo Johns",
      marketplace_id: '7',
      category_id: '8'
    },

    {
      name: "Maize",
      price: "110kes",
      seller: "Pappa",
      marketplace_id: '8',
      category_id: '2'
    },
    {
      name: "Maize Bran",
      price: "110kes",
      seller: "Pappa",
      marketplace_id: '8',
      category_id: '2'
    },
    {
      name: "Maize Flour",
      price: "110kes",
      seller: "Pappa",
      marketplace_id: '8',
      category_id: '2'
    },
    {
      name: "Sorghum",
      price: "110kes",
      seller: "Pappa",
      marketplace_id: '8',
      category_id: '2'
    },
    {
      name: "Sorghum Flour",
      price: "110kes",
      seller: "Pappa",
      marketplace_id: '8',
      category_id: '2'
    },
    {
      name: "Mangoes Local",
      price: "110kes",
      seller: "Sarah Riley",
      marketplace_id: '8',
      category_id: '3'
    },
    {
      name: "Mangoes Ngowe",
      price: "110kes",
      seller: "Sarah Riley",
      marketplace_id: '8',
      category_id: '3'
    },
    {
      name: "Pineapples",
      price: "110kes",
      seller: "Sarah Riley",
      marketplace_id: '8',
      category_id: '3'
    },
    {
      name: "Pawpaw",
      price: "110kes",
      seller: "Sarah Riley",
      marketplace_id: '8',
      category_id: '3'
    },
    {
      name: "Unprocessed Cotton",
      price: "110kes",
      seller: "Sarah Riley",
      marketplace_id: '8',
      category_id: '5'
    },
    {
      name: "Unprocessed Tea",
      price: "110kes",
      seller: "Sarah Riley",
      marketplace_id: '8',
      category_id: '5'
    },
    {
      name: "Unprocessed Vanilla",
      price: "110kes",
      seller: "Sarah Riley",
      marketplace_id: '8',
      category_id: '5'
    },
    {
      name: "Cassava Fresh",
      price: "110kes",
      seller: "Parcheesi Columba",
      marketplace_id: '8',
      category_id: '6'
    },
    {
      name: "Simsim",
      price: "110kes",
      seller: "Parcheesi Columba",
      marketplace_id: '8',
      category_id: '6'
    },
    {
      name: "Cowpeas",
      price: "110kes",
      seller: "Parcheesi Columba",
      marketplace_id: '8',
      category_id: '8'
    },
    {
      name: "Fresh Peas",
      price: "110kes",
      seller: "Parcheesi Columba",
      marketplace_id: '8',
      category_id: '8'
    },
  ]);
};


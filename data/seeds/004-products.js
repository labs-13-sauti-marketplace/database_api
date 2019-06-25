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
      name: "beef",
      price: "110kes",
      seller: "Tomba Manu",
      marketplace_id: '5',
      category_id: '1'
    },
    {
      name: "goat meat",
      price: "110kes",
      seller: "Tomba Manu",
      marketplace_id: '6',
      category_id: '1'
    },
    {
      name: "pork",
      price: "110kes",
      seller: "Tomba Manu",
      marketplace_id: '6',
      category_id: '1'
    },
    {
      name: "turkey",
      price: "110kes",
      seller: "Tomba Manu",
      marketplace_id: '7',
      category_id: '1'
    },

    {
      name: "agwedde beans",
      price: "110kes",
      seller: "Tomba Manu",
      marketplace_id: '7',
      category_id: '4'
    },
    {
      name: "maize",
      price: "110kes",
      seller: "Tomba Manu",
      marketplace_id: '7',
      category_id: '2'
    },
    {
      name: "millet",
      price: "110kes",
      seller: "Tomba Manu",
      marketplace_id: '7',
      category_id: '2'
    },
    {
      name: "white rice",
      price: "110kes",
      seller: "Tomba Manu",
      marketplace_id: '7',
      category_id: '2'
    },
    {
      name: "bananas",
      price: "110kes",
      seller: "Tomba Manu",
      marketplace_id: '7',
      category_id: '3'
    },
    {
      name: "coffee",
      price: "110kes",
      seller: "Tomba Manu",
      marketplace_id: '8',
      category_id: '5'
    },
    {
      name: "sweet potatoes",
      price: "110kes",
      seller: "Tomba Manu",
      marketplace_id: '8',
      category_id: '8'
    },
    {
      name: "sunflower seeds",
      price: "110kes",
      seller: "Tomba Manu",
      marketplace_id: '8',
      category_id: '7'
    },
    {
      name: "peas",
      price: "110kes",
      seller: "Sarah Riley",
      marketplace_id: '8',
      category_id: '8'
    }
  ]);
};

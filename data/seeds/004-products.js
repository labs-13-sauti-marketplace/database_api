exports.seed = function(knex, Promise) {
  return knex("products").insert([
    { name: "eggs", price: "1.00" }, // 1
    { name: "maize", price: "2.00" }, // 2
    { name: "millet", price: "3.00" }, // 3
    { name: "white rice", price: "4.00" }, // 4
    { name: "bananas", price: "5.00" }, // 5
    { name: "coffee", price: "6.00" }, // 6
    { name: "sweet potatoes", price: "7.00" }, // 7
    { name: "sunflower seeds", price: "8.00" }, // 8
    { name: "peas", price: "9.00" } // 9
  ]);
};

exports.seed = function (knex, Promise) {
  return knex("products").insert([
    { name: "white eggs", price: "110kes" }, // 1
    { name: "exotic eggs", price: "110kes" }, // 2
    { name: "brown eggs", price: "110kes" }, // 3
    { name: "milk", price: "110kes" }, // 4
    { name: "nile perch", price: "110kes" }, // 5
    { name: "tilapia", price: "110kes" }, // 6
    { name: "processed honey", price: "110kes" }, // 7
    { name: "unprocessed honey", price: "110kes" }, // 8
    { name: "beef", price: "110kes" }, // 9
    { name: "goat meat", price: "110kes" }, // 10
    { name: "pork", price: "110kes" }, // 11
    { name: "local chicken", price: "110kes" }, // 12
    { name: "turkey", price: "110kes" }, // 13

    { name: "agwedde beans", price: "110kes" }, // 14
    { name: "maize", price: "110kes" }, // 15
    { name: "millet", price: "110kes" }, // 16
    { name: "white rice", price: "110kes" }, // 17
    { name: "bananas", price: "110kes" }, // 18
    { name: "coffee", price: "110kes" }, // 19
    { name: "sweet potatoes", price: "110kes" }, // 20
    { name: "sunflower seeds", price: "110kes" }, // 21
    { name: "peas", price: "110kes" } // 22
  ]);
};

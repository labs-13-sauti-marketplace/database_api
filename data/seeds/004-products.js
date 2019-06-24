exports.seed = function (knex, Promise) {
  return knex("products").insert([
    { name: "white eggs", price: "110kes", seller: "Tomba Manu" }, // 1 animal
    { name: "exotic eggs", price: "110kes", seller: "Tomba Manu" }, // 2 animal
    { name: "brown eggs", price: "110kes", seller: "Tomba Manu" },  // 3 animal
    { name: "milk", price: "110kes", seller: "Tomba Manu" }, // 4 animal
    { name: "nile perch", price: "110kes", seller: "Tomba Manu" }, // 5 animal
    { name: "tilapia", price: "110kes", seller: "Tomba Manu" }, // 6 animal
    { name: "processed honey", price: "110kes", seller: "Tomba Manu" }, // 7 animal
    { name: "unprocessed honey", price: "110kes", seller: "Tomba Manu" }, // 8 animal
    { name: "beef", price: "110kes", seller: "Tomba Manu" }, // 9 animal
    { name: "goat meat", price: "110kes", seller: "Tomba Manu" }, // 10 animal
    { name: "pork", price: "110kes", seller: "Tomba Manu" }, // 11 animal
    { name: "local chicken", price: "110kes", seller: "Tomba Manu" }, // 12 animal
    { name: "turkey", price: "110kes", seller: "Tomba Manu" }, // 13 animal

    { name: "agwedde beans", price: "110kes", seller: "Tomba Manu" }, // 14 beans
    { name: "maize", price: "110kes", seller: "Tomba Manu" }, // 15 cere
    { name: "millet", price: "110kes", seller: "Tomba Manu" }, // 16 cere Maize
    { name: "white rice", price: "110kes", seller: "Tomba Manu" }, // 17 rice
    { name: "bananas", price: "110kes", seller: "Tomba Manu" }, // 18 fruit
    { name: "coffee", price: "110kes", seller: "Tomba Manu" }, // 19 other
    { name: "sweet potatoes", price: "110kes", seller: "Tomba Manu" }, // 20 Roots 
    { name: "sunflower seeds", price: "110kes", seller: "Tomba Manu" }, // 21 nuts
    { name: "peas", price: "110kes", seller: "Sarah Riley" } // 22 vege
  ]);
};

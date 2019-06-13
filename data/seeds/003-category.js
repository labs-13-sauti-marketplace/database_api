exports.seed = function(knex, Promise) {
  return knex("categories").insert([
    { name: "Animal Products" }, // 1
    { name: "Cereals-Maize" }, // 2
    { name: "Cereals-Other" }, // 3
    { name: "Rice" }, // 4
    { name: "Fruits" }, // 5
    { name: "Other" }, // 6
    { name: "Roots & Tubers" }, // 7
    { name: "Seeds & Nuts" }, // 8
    { name: "Vegetables" } // 9
  ]);
};
    


exports.seed = function(knex, Promise) {
  return knex("categories").insert([
    { name: "Animal Products" }, // 1
    { name: "Beans" }, // 2
    { name: "Cereals-Maize" }, // 3
    { name: "Cereals-Other" }, // 4
    { name: "Cereals-Rice" }, // 5
    { name: "Fruits" }, // 6
    { name: "Other" }, // 7
    { name: "Peas" }, // 8
    { name: "Roots & Tubers" }, // 9
    { name: "Seeds & Nuts" }, // 10
    { name: "Vegetables" } // 11
  ]);
};


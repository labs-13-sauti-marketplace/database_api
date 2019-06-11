exports.seed = function(knex, Promise) {
  return knex("sub-categories").insert([
    { name: "Animal Products", category_id: "1" }, // 1
    { name: "Livestock", category_id: "1" }, // 2
    { name: "Poultry", category_id: "1" }, // 3
    { name: "Beans", category_id: "2" }, // 4
    { name: "Maize", category_id: "3" }, // 5
    { name: "Barley", category_id: "4" }, // 6
    { name: "Millet", category_id: "4" }, // 7
    { name: "Sorghum", category_id: "4" }, // 8
    { name: "Wheat", category_id: "4" }, // 9
    { name: "Rice", category_id: "5" }, // 10
    { name: "Avocado", category_id: "6" }, // 11
    { name: "Bananas", category_id: "6" }, // 12
    { name: "Fruits", category_id: "6" }, // 13
    { name: "Lemons", category_id: "6" }, // 14
    { name: "Limes", category_id: "6" }, // 15
    { name: "Mangoes", category_id: "6" }, // 16
    { name: "Oranges", category_id: "6" }, // 17
    { name: "Pawpaw", category_id: "6" }, // 18
    { name: "Pineapples", category_id: "6" }, // 19
    { name: "Coffee", category_id: "7" }, // 20
    { name: "Cotton", category_id: "7" }, // 21
    { name: "Tea", category_id: "7" }, // 22
    { name: "Tobacco", category_id: "7" }, // 23
    { name: "Vanilla", category_id: "7" }, // 24
    { name: "Peas", category_id: "8" }, // 25
    { name: "Cassava", category_id: "9" }, // 26
    { name: "Potatoes", category_id: "9" }, // 27
    { name: "Nuts", category_id: "10" }, // 28
    { name: "Simsim", category_id: "10" }, // 29
    { name: "Sunflowers", category_id: "10" }, // 30
    { name: "Brinjals", category_id: "11" }, // 31
    { name: "Cabbages", category_id: "11" }, // 32
    { name: "Capsicums", category_id: "11" }, // 33
    { name: "Carrots", category_id: "11" }, // 34
    { name: "Cauliflower", category_id: "11" }, // 35
    { name: "Chillies", category_id: "11" }, // 36
    { name: "Cucumber", category_id: "11" }, // 37
    { name: "Ginger", category_id: "11" }, // 38
    { name: "Kales", category_id: "11" }, // 39
    { name: "Lettuce", category_id: "11" }, // 40
    { name: "Onions", category_id: "11" }, // 41
    { name: "Tomatoes", category_id: "11" } // 42
  ]);
};

const router = require("express").Router();
const markets = require("./markets-model");
const models = require("./models");
const db = require("../data/dbConfig");


router.post("*", async (req, res) => {
  let { sessionId, serviceCode, phoneNumber, text } = req.body;
  let response = "";
  switch (text) {
    case "":
      response =
        "CON Choose your marketplace \n 1. Busia \n 2. Gitega \n 3. Ngozi";
      break;
    case "1":
      response =
        "CON Choose your product \n 1. White Eggs \n 2. Exotic Eggs \n 3. Local Eggs";
      break;
    case "1*1":
      try {
        const results = await models.findPrice("Busia", "white eggs");
        let newPrice = [];
        results.forEach(function(cake) {
          newPrice.push(cake.price);
        });
        newPrice.toString();

        response = `END Current prices for \n White Eggs ${newPrice}`;
      } catch (error) {
        console.log(error);
        // do stuff with error
      }

      break;
    default:
      response = "Bad request!";
  }
  res.send(response);
});

module.exports = router;

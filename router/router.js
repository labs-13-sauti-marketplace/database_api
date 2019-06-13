const router = require("express").Router();

const models = require("./models");

router.post("*",  async (req, res) => {
  let { sessionId, serviceCode, phoneNumber, text } = req.body;
  let textArray = []
  textArray.push(text)
  console.log(textArray);
  let response = "";
  switch (text) {
    case "":
      response =
        "CON Welcome to Sauti Marketplace. Please choose an option \n 1. Buy \n 2. Sell";
      break;
    case "1":
      response =
        "CON Choose your marketplace \n 1. Bujumbura \n 2. Tororo \n 3. Mbale \n 4. Eldoret \n 5. Kisumu \n 6. Soroti \n 7. Ownio \n 8. Kampala";
      break;
    case "2":
      response = "END Post here eventually, thank you!";
      break;
    case "1*1":
      response =
        "CON Choose your category \n 1. Animal Products \n 2. Beans \n 3. Cereals \n 4. Fruits \n 5. Roots & Tubers \n 6. Seeds & Nuts \n 7. Vegetables \n 8. Other";
      break;
    case "1*1*1":
      response = "CON Choose your product...coming soon!";
      break;
    case "1*1*1*1":
    
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

const router = require("express").Router();

const models = require("./models");
const menu = new UssdMenu()


const bodyParser = require('body-parser')
const UssdMenu = require('ussd-menu-builder');
// const db = require('../data/dbConfig')

let menu = new UssdMenu();

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

async function marketPlaces() {
  const result = await models.get()
  return result
}

menu.startState({
  run: () => {
    menu.con(`\n1. Go To Market \n2. goodbye`)
  },
  next: {
    '1': 'position',
    '2': 'goodbye'
  }
})

menu.state('goodbye', {
  run: () => {
    menu.end(`goodbye`)
  }
})

menu.state('position', {
  run: () => {
    menu.con(`\n1. buyer \n2. seller`)
  },
  next: {
    '1': 'buyer',
    '2': 'seller'
  }
})

menu.state('buyer', {
  run: () => {
    `${marketPlaces().then(res => {
      let lol = []
      for (let i = 0; i < res.length; i++) {
        lol.push(`\n${i + 1}. ${res[i].name}`)
      }
      let stringy = lol.join()
      menu.con(stringy)
    })}`
  },
  next: {
    '1': 'Bujumbura',
    '2': 'Tororo',
    '3': 'Mbale',
    '4': 'Eldoret',
    '5': 'Kisumu',
    '6': 'Soroti',
    '7': 'Ownio',
    '8': 'Kampala'
  }
});


menu.on('error', err => {
  console.log(err);
})

router.post('*', (req, res) => {
  menu.run(req.body, ussdResult => {
    res.send(ussdResult);
  })
})


// router.post("*",  async (req, res) => {
//   let { sessionId, serviceCode, phoneNumber, text } = req.body;
//   let textArray = []
//   textArray.push(text)
//   console.log(textArray);
//   let response = "";
//   switch (text) {
//     case "":
//       response =
//         "CON Welcome to Sauti Marketplace. Please choose an option \n 1. Buy \n 2. Sell";
//       break;
//     case "1":
//       response =
//         "CON Choose your marketplace \n 1. Bujumbura \n 2. Tororo \n 3. Mbale \n 4. Eldoret \n 5. Kisumu \n 6. Soroti \n 7. Ownio \n 8. Kampala";
//       break;
//     case "2":
//       response = "END Post here eventually, thank you!";
//       break;
//     case "1*1":
//       response =
//         "CON Choose your category \n 1. Animal Products \n 2. Beans \n 3. Cereals \n 4. Fruits \n 5. Roots & Tubers \n 6. Seeds & Nuts \n 7. Vegetables \n 8. Other";
//       break;
//     case "1*1*1":
//       response = "CON Choose your product...coming soon!";
//       break;
//     case "1*1*1*1":

//       try {
//         const results = await models.findPrice("Busia", "white eggs");
//         let newPrice = [];
//         results.forEach(function(cake) {
//           newPrice.push(cake.price);
//         });
//         newPrice.toString();
//         response = `END Current prices for \n White Eggs ${newPrice}`;
//       } catch (error) {
//         console.log(error);
//         // do stuff with error
//       }
//       break;
//     default:
//       response = "Bad request!";
//   }
//   res.send(response);
// });



module.exports = router;

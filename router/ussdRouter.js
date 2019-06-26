const router = require("express").Router();
const bodyParser = require("body-parser");
const models = require('./models')
const UssdMenu = require("ussd-menu-builder");
const bodyParser = require('body-parser');
const db = require('../data/dbConfig')


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("It's alive!");
});

app.get("/products", (req, res) => {
  db("products")
    .then(products => {
      res.status(200).json(products);
    })
    .catch(err => {
      res.status(400).json({ message: "Fail" });
    });
});

let menu = new UssdMenu();
const sessionStore = {};

// Define menu states
menu.startState({
  run: () => {
    sessionStore[menu.args.sessionId] = {}
    console.log('NEW SESSION ', sessionStore)
    // use menu.con() to send response without terminating session
    menu.con("Welcome. Choose option:" + "\n1. Buyer" + "\n2. Seller");
  },
  // next object links to next state based on user input
  next: {
    "1": "markets",
    "2": "postForSale"
  }
});

const fetchMarkets = (phoneNumber, session, text) => {
  const market = "Bujumbaru";
  console.log("FETCH P#: ", phoneNumber);
  console.log("FETCH SESH: ", session);
  console.log("FETCH TEXT: ", text);
  return db("products")
    .where({ market: market })
}

menu.state("markets", {
  run: () => {
    fetchMarkets(menu.args.phoneNumber, menu.args.sessionId, menu.args.text)
      .then(res => {
        console.log("DB RES: ", res);
        if(res.length > 0) {
          let options = "";
          for(let i = 0; i < res.length; i++){
            options += `\n#${res[i].id}: ${res[i].product} $${res[i].price}`
          }
          menu.con(`Fetched ${res.length} items from db${options}`)
        } else {
          menu.con("Found no products in that market that match your selection")
        }
      })
      .catch(err => {
        menu.con(err);
      })
  },

  next: {"0": "start"},

  defaultNext: "product"
})

menu.state("product", {
  run: () => {
    // gives you an array of all the decisions
    // the user has made. 
    // the last item in that array is the most recent
    // menu.args.text.split("*")

    // sets a key/value that can be used anywhere else in the application
    // menu.session.set({"product_id": menu.args.text.split("*")})
    // retreives the value for the key stored for the session
    // menu.session.get("product_id")
    sessionStore[menu.args.sessionId].productId = menu.val;
    console.log("SESSION STORAGE", sessionStore)
    menu.end(`You chose item with the id ${sessionStore[menu.args.sessionId].productId}`);
  }
})

menu.state("done", {
  run: () => {
    menu.end('Goodbye');
  }
})


menu.state("Test", {
  run: () => {
    menu.end("You made it!");
  }
});

menu.state("postForSale", {
  run: () => {
    menu.con("Enter a country:");
  },
  next: {
    "*[a-zA-Z]+": "addCountry"
  }
});

// nesting states
menu.state("addCountry", {
  run: () => {
    // use menu.val to access user input value
    let country = menu.val;
    const product = {
      country: country,
      market: "market",
      product: "product",
      price: "price"
    };
    db("products")
      .insert(product)
      .then(res => {
        menu.end("Country added successfully!");
      })
      .catch(err => {
        menu.end("Fail");
      });
  }
});


router.post('*', (req, res) => {
  let args = {
      phoneNumber: req.body.phoneNumber,
      sessionId: req.body.sessionId,
      serviceCode: req.body.serviceCode,
      text: req.body.text
  };
  menu.run(args, resMsg => {
      console.log("PHONE: ", args.phoneNumber);
      console.log("SESSION: ", args.sessionId);
      console.log("SERVICE CODE: ", args.serviceCode);
      console.log("TEXT: ", args.text);
      res.send(resMsg);
  });
})

module.exports = router;
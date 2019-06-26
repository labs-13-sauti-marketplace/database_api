const router = require("express").Router();
const UssdMenu = require('ussd-menu-builder')
const models = require("./models");
const sessionModel = require('./sessions-model')
const menu = new UssdMenu()

const bodyParser = require('body-parser')

const db = require('../data/dbConfig')
const sessionStore = {};

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// pulling in helper functions
async function marketPlaces() {
  const result = await models.getMarkets();
  return result;
}

async function categories() {
  const result = await models.getMarketplaceCategories();
  return result;
}

async function products() {
  const result = await models.getProducts();
  return result;
}

async function countries() {
  const result = await models.getCountries();
  return result;
}

let sessions = {};
menu.sessionConfig({
  start: (sessionId, callback) => {
      // initialize current session if it doesn't exist
      // this is called by menu.run()
      if(!(sessionId in sessions)) sessions[sessionId] = {};
      callback();
  },
  end: (sessionId, callback) => {
      // clear current session
      // this is called by menu.end()
      delete sessions[sessionId];
      callback();
  },
  set: (sessionId, key, value) => {
      // store key-value pair in current session
      // sessions[sessionId][key] = value;
      // callback();
      return new Promise((resolve, reject) => {
        sessions[sessionId][key] = value;
        resolve(value)
      })
  },
  get: (sessionId, key) => {
      // retrieve value by key in current session
      // let value = sessions[sessionId][key];
      // callback(null, value);
      return new Promise((resolve, reject) => {
        let value = sessions[sessionId][key];
        resolve(value)
      })
  }
});

// setting initial state of menu
menu.startState({
  run: () => {
    console.log("START STATE()")
    sessionStore[menu.args.sessionId] = {}
    console.log('NEW SESSION ', sessionStore)
    menu.con(`Go to market as \n1. Buyer \n2. Seller`);
  },
  next: {
    "1": "market",
    "2": "goodbye"
  }
});

// functions based on user's menu choice
menu.state("goodbye", {
  run: () => {
    menu.end(`goodbye`);
  }
});


// const fetchProducts = (phoneNumber, sessionId, text) => {
//   // const market = "Busia"
//   console.log('FETCH P#: ', phoneNumber)
//   console.log('FETCH SESH: ', sessionId)
//   console.log('FETCH TEXT: ', text)
//   return db('products')
//     .where({ market: market })
// }

// fetchProducts(menu.args.phoneNumber, menu.args.sessionId, menu.args.text)
//   .then(res => {
//     console.log("DB RES: ", res)
//     if (res.length > 0) {
//       let options = ''
//       for (let i = 0; i < res.length; i++) {
//         options += `\n#${res[i].id}: ${res[i].name} ${res[i].price}`
//       }
//       menu.con(`Fetched ${res.length} items from db${options}`)
//     } else {
//       menu.con('Found no products in that market that match your selection')
//     }
//   })
//   .catch(err => {
//     menu.con(err)
//   })

const parseInput = str => {
  let array
  array = str.split('*')
  return array[array.length - 1]
}

const handleError = err => {
  console.log('ERROR', err)
  menu.end('An error occurred. Check the logs.')
}

menu.state('country', {
  run: () => {
    console.log("MARKET()")
    .countries().then(res => {
      let lol = [];
      for (let i = 0; i < res.length; i++) {
        lol.push(`\n#${res[i].id}: ${res[i].name}`);
      }
      let stringy = lol.join("");
      
      menu.con(stringy);
    });
  },
  next: {
    '0': 'start'
  },
  defaultNext: 'category'
})

menu.state('category', {
  run: () => {

    sessionStore[menu.args.sessionId].categoryId = menu.val;
    console.log("CATEGORY()")
    console.log("CATEGORY TEXT", menu.args.text)
    console.log("SESSION", menu.session)
    console.log("CATEGORY VAL", menu.val)
    console.log("GLOBAL SESSIONS", sessions)
    console.log("SESSION STORAGE", sessionStore)
    
    // menu.session.set(menu.args.sessionId, 'marketplace_id', menu.val)
    //   .then(res => console.log("set market id to ", res))
    //   .catch(err => console.log("error setting ", err))
    // menu.session.get("marketplace_id")
    // console.log("SESSION MARKET ID", menu.session.get("marketplace_id"))
    // console.log("RETRIEVE KEY", menu.session.get(menu.args.sessionId, 'marketplace_id'), (err) => handleError(err))
  
    menu.end(`You chose item with the id ${sessionStore[menu.args.sessionId].categoryId}`)

  },
 
  next: {
    '0': 'start'
  },
  defaultNext: 'product'
})



menu.state("product", {
  run: () => {
    // menu.session.set( "marketplace_id", parseInput(menu.args.text), (err) => handleError(err) );
    
    `${products(sessionStore[menu.args.sessionId].categoryId).then(res => {
      let lol = [];
      for (let i = 0; i < res.length; i++) {
        lol.push(`\n#${res[i].id}: ${res[i].name}`);
      }
      let stringy = lol.join();
      menu.con(stringy);
    })}`;

  },
  next: {
    "0": "start"
  },
  defaultNext: "product"
});

menu.on("error", err => {
  console.log(err);
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

const router = require("express").Router();
const UssdMenu = require('ussd-menu-builder')
const models = require("./models");
const sessionModel = require('./sessions-model')
const menu = new UssdMenu()

const bodyParser = require('body-parser')

require('../data/dbConfig')
const sessionStore = {};

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// pulling in helper functions
async function marketPlaces(countryId) {
  const result = await models.getMarketByCountryId(countryId);
  return result;
}

async function categories() {
  const result = await models.getMarketplaceCategories();
  return result;
}

async function products(marketplaceId, categoryId) {
  const result = await models.getProductByMarketAndCatId(marketplaceId, categoryId);
  return result;
}

async function countries() {
  const result = await models.getCountries();
  return result;
}


async function countries() {
  const result = await models.getCountries();
  return result;
}



// setting initial state of menu
menu.startState({
  run: () => {
    console.log("START STATE()")
    sessionStore[menu.args.sessionId] = {}
    console.log('NEW SESSION ', sessionStore)
    menu.con(`Go to market as \n1. Buyer \n2. Seller`);
  },
  next: {
    "1": "country",
    "2": "goodbye"
  }
});

// functions based on user's menu choice
menu.state("goodbye", {
  run: () => {
    menu.end(`goodbye`);
  }
});


menu.state('country', {
  run: async () => {
    console.log("COUNTRY()")
    await countries().then(res => {
      let lol = [];
      for (let i = 0; i < res.length; i++) {
        lol.push(`\n#${res[i].id}: ${res[i].name}`);
      }

      let stringy = lol.join("");
      menu.con(stringy);
    })
    .catch(e => {
      console.log(e)
    })
    ;
  },
  next: {
    '0': 'start'
  },
  defaultNext: 'market'

})



menu.state('market', {
  run: () => {

    sessionStore[menu.args.sessionId].countryId = menu.val;

    console.log("MARKET SESSION STORAGE", sessionStore)
    marketPlaces(sessionStore[menu.args.sessionId].countryId).then(res => {
      console.log("MARKET RES", res)
      if (res.length < 1) {
        menu.end("No marketplaces in that country.")
      }
      let lol = [];
      for (let i = 0; i < res.length; i++) {
        lol.push(`\n#${res[i].id}: ${res[i].name}`);
      }
      let stringy = lol.join("");

      menu.con(stringy);
    })
      .catch(err => {
        console.log(err)
        menu.end('error')
      })

  },

  next: {
    '0': 'start'
  },
  defaultNext: 'category'
})


menu.state("category", {
  run: () => {
    sessionStore[menu.args.sessionId].marketplaceId = menu.val;

    console.log("CATEGORY()")
    categories().then(res => {
      let lol = [];
      for (let i = 0; i < res.length; i++) {
        lol.push(`\n#${res[i].id}: ${res[i].name}`);
      }
      let stringy = lol.join("");

      menu.con(stringy);
    })
    .catch(err => {
      console.log(err)
      menu.end('error')
    })

  },
  next: {
    "0": "start"
  },
  defaultNext: "product"
});


menu.state("product", {
  run: () => {
    sessionStore[menu.args.sessionId].categoryId = menu.val;
    console.log("PRODUCT()")

    console.log("SESSION STORAGE", sessionStore)

    products(sessionStore[menu.args.sessionId].marketplaceId, sessionStore[menu.args.sessionId].categoryId).then(res => {
      console.log("MARKET RES", res)
      if(res.length < 1) {
        menu.end("No products available.")
      }
      let lol = [];
      for (let i = 0; i < res.length; i++) {
        lol.push(`\n#${res[i].id}: ${res[i].name} ${res[i].price} ${res[i].seller}`);
      }
      let stringy = lol.join("");
      
      menu.con(stringy);
    })
    .catch(err => {
      console.log(err)
      menu.end('error')
    })

  },
  next: {
    "0": "start"
  },
  defaultNext: "product"
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

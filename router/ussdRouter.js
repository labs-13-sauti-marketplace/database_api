const router = require("express").Router();
const UssdMenu = require("ussd-menu-builder");
const models = require("./models");
const sessionModel = require("./sessions-model");
const menu = new UssdMenu();

const bodyParser = require("body-parser");

// const db = require('../data/dbConfig')
const sessionStore = {};



/*
------------------------------------------------------------------------------------------
Menu & State Generators
------------------------------------------------------------------------------------------
*/
function generateMenuStringFromDbRows(dbRows) {
  let stringy = ''
  dbRows.forEach((row, i) => {
    const digit = i + 1
    stringy += `\n${digit}. ${row.name}`
  })
  return stringy
}

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
  const result = await models.getProductByMarketAndCatId(
    marketplaceId,
    categoryId
  );
  return result;
}

async function addProducts(name, marketplaceId, categoryId) {
  const result = await models.addProductInfo(name, marketplaceId, categoryId);
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

async function invalidOptionSelected(menuStr) {
  menuStr = `Invalid entry.\n` + menuStr;
  return menuStr;
}

/* ----------------------------------------------
      START MENU
--------------------------------------------------*/
// setting initial state of menu
menu.startState({
  run: () => {
    console.log("START STATE()");
    sessionStore[menu.args.sessionId] = {};
    console.log("NEW SESSION ", sessionStore);
    menu.con(`Go to market as \n1. Buyer \n2. Seller`);
  },
  next: {
    "1": "buyerCountry",
    "2": "sellerCountry"
  }
});

menu.state("start", {
  run: () => {
    menu.goStart();
  },
  next: {
    "1": "buyerCountry",
    "2": "sellerCountry"
  }
});

/* ----------------------------------------------
      BUYER STATES
--------------------------------------------------*/
menu.state("buyerCountry", {
  run: () => {
    countries().then(res => {
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
      .catch(err => {
        console.log(err);
        menu.end("error");
      });
  },
  next: {
    "0": "start"
  },
  defaultNext: "buyerMarket"
});

menu.state("buyerMarket", {
  run: () => {
    sessionStore[menu.args.sessionId].countryId = menu.val;

    console.log("MARKET SESSION STORAGE", sessionStore)
    marketPlaces(sessionStore[menu.args.sessionId].countryId).then(res => {
      console.log("MARKET RES", res)
      if (res.length < 1) {
        menu.end("No marketplaces in that country. \n0: Start over \n99: Choose another country")
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
      .catch(err => {
        console.log(err);
        menu.end("error");
      });
  },

  next: {
    '0': 'start',
    "99": "buyerCountry"
  },
  defaultNext: "buyerCategory"
});

menu.state("buyerCategory", {
  run: () => {
    sessionStore[menu.args.sessionId].marketplaceId = menu.val;

    categories()
      .then(res => {
        let lol = [];
        for (let i = 0; i < res.length; i++) {
          lol.push(`\n#${res[i].id}: ${res[i].name}`);
        }
        let stringy = lol.join("");

        menu.con(stringy);
      })
      .catch(err => {
        console.log(err);
        menu.end("error");
      });
  },
  next: {
    "0": "start"
  },
  defaultNext: "buyerProduct"
});

menu.state("buyerProduct", {

  run: () => {
    sessionStore[menu.args.sessionId].categoryId = menu.val;
    console.log("PRODUCT()");

    console.log("SESSION STORAGE", sessionStore);

    products(sessionStore[menu.args.sessionId].marketplaceId, sessionStore[menu.args.sessionId].categoryId).then(res => {
      console.log("MARKET RES", res)
      if (res.length < 1) {
        menu.con("No products available. \n0: Start over \n99: Choose another category")
      }
      let lol = [];
      for (let i = 0; i < res.length; i++) {
        lol.push(`\n#${res[i].id}: ${res[i].name} \n${res[i].price} \n${res[i].seller} \n${res[i].contact_info} \n`);
      }
      let stringy = lol.join("");

      menu.end(stringy);
    })
      .catch(err => {
        console.log(err)
        menu.end('error')
      })
      .catch(err => {
        console.log(err);
        menu.end("error");
      });
  },
  next: {
    "0": "start",
    "99": "buyerCategory"
  }
});

/* ----------------------------------------------
      SELLER STATES
--------------------------------------------------*/

menu.state("sellerCountry", {
  run: () => {
    countries()
      .then(res => {
        let lol = [];
        for (let i = 0; i < res.length; i++) {
          lol.push(`\n#${res[i].id}: ${res[i].name}`);
        }

        let stringy = lol.join("");

        menu.con(stringy);
      })
      .catch(err => {
        console.log(err);
        menu.end("error");
      });
  },
  next: {
    "0": "start"
  },
  defaultNext: "sellerMarket"
});

menu.state("sellerMarket", {
  run: () => {
    sessionStore[menu.args.sessionId].countryId = menu.val;
    console.log("SESSION STORAGE", sessionStore)
    marketPlaces(sessionStore[menu.args.sessionId].countryId).then(res => {
      console.log("MARKET RES", res)
      if (res.length < 1) {
        menu.end("No marketplaces in that country. \n0: Start over \n99: Choose another country")
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
      .catch(err => {
        console.log(err);
        menu.end("error");
      });
  },

  next: {
    '0': 'start',
    '99': 'sellerCountry'
  },
  defaultNext: "sellerCategory"
});

menu.state("sellerCategory", {
  run: () => {
    sessionStore[menu.args.sessionId].marketplaceId = menu.val;
    categories()
      .then(res => {
        let lol = [];
        for (let i = 0; i < res.length; i++) {
          lol.push(`\n#${res[i].id}: ${res[i].name}`);
        }
        let stringy = lol.join("");

        menu.con(stringy);
      })
      .catch(err => {
        console.log(err);
        menu.end("error");
      });
  },
  next: {
    "0": "start",
    "99": "category"
  },
  defaultNext: "sellerAddName"
});



menu.state("sellerAddName", {
  run: () => {
    sessionStore[menu.args.sessionId].categoryId = menu.val;
    // console.log("SESSION STORAGE", sessionStore)
    menu.con("Enter product name:");
  },
  next: {
    "*[a-zA-Z]+": "sellerPostInfo"
  }
});

menu.state("sellerPostInfo", {
  run: () => {
    sessionStore[menu.args.sessionId].productName = menu.val;
    const name = sessionStore[menu.args.sessionId].productName;
    const market_id = sessionStore[menu.args.sessionId].marketplaceId;
    const category_id = sessionStore[menu.args.sessionId].categoryId;

    addProducts(name, market_id, category_id)
      .then(res => {
        console.log("UNICORN RES", res)
        menu.end("yay");
      })
      .catch(err => {
        console.log(err)
        menu.end('error')
      })
      .catch(err => {
        console.log(err);
        menu.end("error");
      });
  }
});

/* ----------------------------------------------
      POST ENDPOINT
--------------------------------------------------*/

router.post("*", (req, res) => {
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
});

module.exports = router;

const router = require("express").Router();
const UssdMenu = require('ussd-menu-builder')
const models = require("./models");
const menu = new UssdMenu()

const bodyParser = require('body-parser')

const db = require('../data/dbConfig')
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

async function addProducts(name, price, seller, contact_info, marketplace_id, category_id) {
  const result = await models.addProductInfo(name, price, seller, contact_info, marketplace_id, category_id);
  return result;
}

async function countries() {
  const result = await models.getCountries();
  return result;
}

const deleteSession = (sessionId) => {
  console.log('DELETING SESSION', sessionId)
  delete sessionStore[sessionId]
}

async function buyerRouteSellerInfo(marketplace_id, category_id, id) {
  const result = await models.sellerForProduct(marketplace_id, category_id, id)
  return result;
}
/* ----------------------------------------------
      START MENU
--------------------------------------------------*/
// setting initial state of menu
menu.startState({
  run: () => {
    // console.log("START STATE()")
    sessionStore[menu.args.sessionId] = {}
    // console.log('NEW SESSION ', sessionStore)
    menu.con(`Go to market as \n1. Buyer \n2. Seller`);
  },
  next: {
    "1": "buyerCountry",
    "2": "sellerCountry"
  }
});

menu.state('start', {
  run: () => {
    sessionStore[menu.args.sessionId] = {}
    menu.goStart()
  }, next: {
    "1": "buyerCountry",
    "2": "sellerCountry"
  }
})


/* ----------------------------------------------
      BUYER STATES
--------------------------------------------------*/
menu.state('buyerCountry', {

  run: () => {
    countries().then(res => {
      console.log('BUYER_CON_RES', res)
      if (res.length < 1) {
        menu.con("No products available. \n0: Start over \n99: Choose another category")
      }
      let lol = [];
      for (let i = 0; i < res.length; i++) {
        lol.push(`\n${res[i].id}: ${res[i].name}`);
      }
      
      let stringy = lol.join("");
      menu.con('Select a country' + stringy);
    })
      .catch(err => {
        console.log(err)
        deleteSession(menu.args.sessionId)
        menu.end('error')
      })
  },
  next: {
    "0": "start"
  },
  defaultNext: 'buyerMarket'
})


menu.state('buyerMarket', {
  run: () => {
    console.log("MARKET VAL", menu.val)
    if (!menu.val) {
      menu.con('Please enter a valid country choice. \n0: Choose another country')
    }
    sessionStore[menu.args.sessionId].countryId = menu.val;

    marketPlaces(sessionStore[menu.args.sessionId].countryId).then(res => {
      if (res.length < 1) {
        menu.con("No marketplaces in that country. \n0: Start over \n99: Choose another country")
      }
      let lol = [];
      for (let i = 0; i < res.length; i++) {
        lol.push(`\n${res[i].id}: ${res[i].name}`);
      }
      let stringy = lol.join("");

      menu.con('Select a market' + stringy);
    })
      .catch(err => {
        console.log(err)
        // deleteSession(menu.args.sessionId)
        menu.end('error')
      })

  },

  next: {
    "": "buyerCountry",
    "*[a-zA-Z]+": "buyerCountry",
    "99": "buyerCountry",
    "0": "start"
  },
  defaultNext: 'buyerCategory'
})

menu.state("reselectCategory", {
  run: () => {

    categories().then(res => {
      let lol = [];
      for (let i = 0; i < res.length; i++) {
        lol.push(`\n${res[i].id}: ${res[i].name}`);
      }
      let stringy = lol.join("");

      menu.con('Select a category' + stringy);
    })
      .catch(err => {
        console.log(err)
        deleteSession(menu.args.sessionId)
        menu.end('error')
      })

  },
  next: {
    "": "buyerMarket",
    "*[a-zA-Z]+": "buyerMarket",
    "99": "buyerMarket"
  },
  defaultNext: "buyerProduct"
});

menu.state("buyerCategory", {
  run: () => {
    if (menu.val !== '99' || menu.val !== '') {
      sessionStore[menu.args.sessionId].marketplaceId = menu.val;
    }

    categories().then(res => {
      let lol = [];
      for (let i = 0; i < res.length; i++) {
        lol.push(`\n${res[i].id}: ${res[i].name}`);
      }
      let stringy = lol.join("");

      menu.con('Select a category' + stringy);
    })
      .catch(err => {
        console.log(err)
        deleteSession(menu.args.sessionId)
        menu.end('error')
      })

  },
  next: {
    "": "buyerMarket",
    "*[a-zA-Z]+": "buyerMarket",
    "99": "buyerMarket"
  },
  defaultNext: "buyerProduct"
});


menu.state("buyerProduct", {
  run: () => {
    if (menu.val !== '99' || menu.val !== '') {
      sessionStore[menu.args.sessionId].categoryId = menu.val;
    }
    products(sessionStore[menu.args.sessionId].marketplaceId, sessionStore[menu.args.sessionId].categoryId).then(res => {
      if (res.length < 1) {
        return menu.con("No products available. \n99: Choose another category")
      }
      let lol = [];
      for (let i = 0; i < res.length; i++) {

        lol.push(`\n${res[i].id}: ${res[i].name} \n${res[i].price} \n${res[i].seller} \n${res[i].contact_info} \n`);

      }
      let stringy = lol.join("");
      menu.con(stringy);

    })
      .catch(err => {
        console.log(err)
        deleteSession(menu.args.sessionId)
        menu.end('error')
      });

  },
  next: {
    "": "buyerCategory",
    "*[a-zA-Z]+": "buyerCategory",
    "99": "reselectCategory"
  },
  defaultNext: "buyerSideSellerInfo"

});

menu.state('buyerSideSellerInfo', {
  run: () => {
    buyerRouteSellerInfo().then( res =>{
      menu.end(res)
    }).catch(err =>console.log(err))
  }
})

/* ----------------------------------------------
      SELLER STATES
--------------------------------------------------*/

menu.state('sellerCountry', {
  run: () => {
    countries().then(res => {
      let lol = [];
      for (let i = 0; i < res.length; i++) {
        lol.push(`\n${res[i].id}: ${res[i].name}`);
      }

      let stringy = lol.join("");

      menu.con(stringy);
    })
      .catch(err => {
        console.log(err)
        deleteSession(menu.args.sessionId)
        menu.end('error')
      })
  },
  next: {
    "0": "start",
    // "": "sellerCountry",
    // "*[a-zA-Z]+": "sellerCountry"
  },
  defaultNext: 'sellerMarket'

})



menu.state('sellerMarket', {
  run: () => {
    if (!menu.val) {
      menu.con('Please enter a valid country choice. \n0: Choose another country.')
    }

    sessionStore[menu.args.sessionId].countryId = menu.val;
    console.log("SESSION STORAGE", sessionStore)
    marketPlaces(sessionStore[menu.args.sessionId].countryId).then(res => {
      console.log("MARKET RES", res)
      if (res.length < 1) {
        menu.con("No marketplaces in that country. \n0: Start over \n99: Choose another country")
      }
      let lol = [];
      for (let i = 0; i < res.length; i++) {
        lol.push(`\n${res[i].id}: ${res[i].name}`);
      }
      let stringy = lol.join("");

      menu.con(stringy);
    })
      .catch(err => {
        console.log(err)
        // deleteSession(menu.args.sessionId)
        menu.end('error')
      })
  },

  next: {
    "": "sellerCountry",
    "*[a-zA-Z]+": "sellerCountry",
    "99": "sellerCountry",
    "0": "start"
  },
  defaultNext: 'sellerCategory'
})


menu.state("sellerCategory", {
  run: () => {
    sessionStore[menu.args.sessionId].marketplaceId = menu.val;
    categories().then(res => {
      let lol = [];
      for (let i = 0; i < res.length; i++) {
        lol.push(`\n${res[i].id}: ${res[i].name}`);
      }
      let stringy = lol.join("");

      menu.con(stringy);
    })
      .catch(err => {
        console.log(err)
        deleteSession(menu.args.sessionId)
        menu.end('error')
      })

  },
  next: {
    "": "sellerMarket",
    "*[a-zA-Z]+": "sellerMarket",
    "99": "sellerMarket"
  },
  defaultNext: "sellerAddProductName"
});


menu.state("sellerAddProductName", {
  run: () => {

    sessionStore[menu.args.sessionId].categoryId = menu.val;
    menu.con("Enter product name:");
  },
  next: {
    "*": "sellerAddPrice"
  }
});

menu.state("sellerAddPrice", {
  run: () => {
    sessionStore[menu.args.sessionId].productName = menu.val;
    menu.con("Enter product price:");
  },
  next: {
    "*": "sellerAddSellerName"
  }
});

menu.state("sellerAddSellerName", {
  run: () => {
    sessionStore[menu.args.sessionId].price = menu.val;
    menu.con("Enter contact name:");
  },
  next: {
    "*": "sellerAddPhoneNumber"
  }
});

menu.state("sellerAddPhoneNumber", {
  run: () => {
    sessionStore[menu.args.sessionId].sellerName = menu.val;
    menu.con("Enter contact phone number:");
  },
  next: {
    "*": "sellerPostInfo"
  }
});


menu.state("sellerPostInfo", {
  run: () => {


    sessionStore[menu.args.sessionId].phoneNumber = menu.val;

    const name = sessionStore[menu.args.sessionId].productName;
    const price = sessionStore[menu.args.sessionId].price;
    const seller = sessionStore[menu.args.sessionId].sellerName;
    const contact_info = sessionStore[menu.args.sessionId].phoneNumber;
    const marketplace_id = sessionStore[menu.args.sessionId].marketplaceId;
    const category_id = sessionStore[menu.args.sessionId].categoryId;

    addProducts(name, price, seller, contact_info, marketplace_id, category_id).then(res => {
      console.log("UNICORN RES", res)
      deleteSession(menu.args.sessionId)
      menu.end(`Your post of ${name} was successful! `);
    })
      .catch(err => {
        console.log(err)
        menu.end('error')
      })
  }
});


menu.on('error', (e) => {
  console.log('MENU.ON', e)
  menu.run('start')
})






/* ----------------------------------------------
      POST ENDPOINT
--------------------------------------------------*/


router.post('*', (req, res) => {
  let args = {
    phoneNumber: req.body.phoneNumber,
    sessionId: req.body.sessionId,
    serviceCode: req.body.serviceCode,
    text: req.body.text
  };
  let session = {
    sessionId: args.sessionId,
    phoneNumber: args.phoneNumber,
    text: args.text,
  };
  menu.run(args, resMsg => {
    console.log("PHONE: ", args.phoneNumber);
    console.log("SESSION: ", args.sessionId);
    console.log("SERVICE CODE: ", args.serviceCode);
    console.log("TEXT: ", args.text);
    console.log("TEXT.length: ", args.text.length);
    

    res.send(resMsg);



    db("sessions")
      .insert(session)
      .then(res => {
        menu.end("session added successfully!");
      })
      .catch(err => {
        menu.end("Fail");
      });

  });
})

module.exports = router;

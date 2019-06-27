const router = require("express").Router();
const UssdMenu = require('ussd-menu-builder')
const models = require("./models");
const sessionModel = require('./sessions-model')
const menu = new UssdMenu()

const bodyParser = require('body-parser')

// const db = require('../data/dbConfig')
const sessionStore = {};

// async function marketPlaces() {
//   const result = await models.getMarkets()
//   return result
// }

// async function categories() {
//   const result = await models.getCat()
//   return result
// }

// async function products() {
//   const result = await models.getProducts()
//   return result
// }

/*
------------------------------------------------------------------------------------------
Menu & State Generators
------------------------------------------------------------------------------------------
*/
function generateMenuStringFromDbRows (dbRows) {
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
  const result = await models.getProductByMarketAndCatId(marketplaceId, categoryId);
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
    console.log("START STATE()")
    sessionStore[menu.args.sessionId] = {}
    console.log('NEW SESSION ', sessionStore)
    menu.con(`Go to market as \n1. Buyer \n2. Seller`);
  },
  next: {
    "1": "buyerCountry",
    "2": "sellerCountry"
  }
});

menu.state('start', {
  run: () => {
    menu.goStart()
  }, next: {
    "1": "buyerCountry",
    "2": "goodbye"
  }
})


/* ----------------------------------------------
      BUYER STATES
--------------------------------------------------*/
menu.state('buyerCountry', {

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
        menu.go('invalidOptionSelected')
      })
  },
  next: {
    '0': 'start'
  },
  defaultNext: 'buyerMarket'

})



menu.state('buyerMarket', {
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

  },

  next: {
    '0': 'start',
    "99": "buyerCountry"
  },
  defaultNext: 'buyerCategory'
})


menu.state("buyerCategory", {
  run: () => {
    sessionStore[menu.args.sessionId].marketplaceId = menu.val;

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
  defaultNext: "buyerProduct"
});




// const fetchProducts = (phoneNumber, sessionId, text) => {
//   const market = "Busia"
//   console.log('FETCH P#: ', phoneNumber)
//   console.log('FETCH SESH: ', sessionId)
//   console.log('FETCH TEXT: ', text)
//   return db('products')
//     .where({ market: market })
// }

// // functions based on user's menu choice
// menu.state('goodbye', {
//   run: () => {
//     menu.end(`goodbye`)
//   }
// })

// // function base on "buyer" choice
// menu.state('buyer', {
//   run: async () => {
//     await menuRunFunctionFromModelGetter(marketPlaces)
//   },
//   next: {
//     '1': 'Busia',
//     '2': 'Tororo',
//     '3': 'Mbale',
//     '4': 'Eldoret',
//     '5': 'Kisumu',
//     '6': 'Soroti',
//     '7': 'Bungoma',
//     '8': 'Kampala'
//   }
// });


// menu.state('Tororo', {
//   run: () => {
//     `${categories().then(res => {
//       let newArray = [];
//       for (let i = 0; i < res.length; i++) {
//         newArray.push(`\n${i + 1}. ${res[i].name}`)
//       }
//       let newList = newArray.join();
//       menu.con(newList)
//     })}`
//   },
//   next: {
//     '1': 'Animal Products',
//     '2': 'Cereals',
//     '3': 'Fruits',
//     '4': 'Beans',
//     '5': 'Other',
//     '6': 'Roots & Tubers',
//     '7': 'Seeds & Nuts',
//     '8': 'Vegetables'
//   }
// })

// menu.state('Soroti', {
//   run: () => {
//     `${categories().then(res => {
//       let newArray = [];
//       for (let i = 0; i < res.length; i++) {
//         newArray.push(`\n${i + 1}. ${res[i].name}`)
//       }
//       let newList = newArray.join();
//       menu.con(newList)
//     })}`
//   },
//   next: {
//     '1': 'Animal Products',
//     '2': 'Cereals',
//     '3': 'Fruits',
//     '4': 'Beans',
//     '5': 'Other',
//     '6': 'Roots & Tubers',
//     '7': 'Seeds & Nuts',
//     '8': 'Vegetables'
//   }
// })

// menu.state('Bungoma', {
//   run: () => {
//     `${categories().then(res => {
//       let newArray = [];
//       for (let i = 0; i < res.length; i++) {
//         newArray.push(`\n${i + 1}. ${res[i].name}`)
//       }
//       let newList = newArray.join();
//       menu.con(newList)
//     })}`
//   },
//   next: {
//     '1': 'Animal Products',
//     '2': 'Cereals',
//     '3': 'Fruits',
//     '4': 'Beans',
//     '5': 'Other',
//     '6': 'Roots & Tubers',
//     '7': 'Seeds & Nuts',
//     '8': 'Vegetables'
//   }
// })

// // function for when user selects the Eldoret market
// menu.state('Eldoret', {
//   run: () => {
//     `${categories().then(res => {
//       let newArray = [];
//       for (let i = 0; i < res.length; i++) {
//         newArray.push(`\n${i + 1}. ${res[i].name}`)
//       }
//       let newList = newArray.join();
//       menu.con(newList)
//     })}`
//   },
//   next: {
//     '1': 'Animal Products',
//     '2': 'Cereals',
//     '3': 'Fruits',
//     '4': 'Beans',
//     '5': 'Other',
//     '6': 'Roots & Tubers',
//     '7': 'Seeds & Nuts',
//     '8': 'Vegetables'
//   }
// })

// // function for when user selects the Kisumu market
// menu.state('Kisumu', {
//   run: () => {
//     `${categories().then(res => {
//       let newArray = [];
//       for (let i = 0; i < res.length; i++) {
//         newArray.push(`\n${i + 1}. ${res[i].name}`)
//       }
//       let newList = newArray.join();
//       menu.con(newList)
//     })}`
//   },
//   next: {
//     '1': 'Animal Products',
//     '2': 'Cereals',
//     '3': 'Fruits',
//     '4': 'Beans',
//     '5': 'Other',
//     '6': 'Roots & Tubers',
//     '7': 'Seeds & Nuts',
//     '8': 'Vegetables'
//   }
// })

// //function based on "Kampala" choice
// menu.state('Kampala', {
//   run: () => {
//     `${categories().then(res => {
//       let catArr = []
//       for (let i = 0; i < res.length; i++) {
//         catArr.push(`\n${i + 1}. ${res[i].name}`)
//       }
//       let result = catArr.join()
//       menu.con(result)
//     })}`
//   },
//   next: {
//     '1': 'Animal Products',
//     '2': 'Cereals',
//     '3': 'Fruits',
//     '4': 'Beans',
//     '5': 'Other',
//     '6': 'Roots & Tubers',
//     '7': 'Seeds & Nuts',
//     '8': 'Vegetables'
//   }
// })

// //function based on "Mbale" menu choice
// menu.state('Mbale', {
//   run: () => {
//     `${categories().then(res => {
//       let catArr = []
//       for (let i = 0; i < res.length; i++) {
//         catArr.push(`\n${i + 1}. ${res[i].name}`)
//       }
//       let result = catArr.join()
//       menu.con(result)
//     })}`
//   },
//   next: {
//     '1': 'Animal Products',
//     '2': 'Cereals',
//     '3': 'Fruits',
//     '4': 'Beans',
//     '5': 'Other',
//     '6': 'Roots & Tubers',
//     '7': 'Seeds & Nuts',
//     '8': 'Vegetables'
//   }
// })

// // function for when user selects the Eldoret market
// menu.state('Eldoret', {
//   run: () => {
//     `${categories().then(res => {
//       let newArray = [];
//       for (let i = 0; i < res.length; i++) {
//         newArray.push(`\n${i + 1}. ${res[i].name}`)
//       }
//       let newList = newArray.join();
//       menu.con(newList)
//     })}`
//   },
//   next: {
//     '1': 'Animal Products',
//     '2': 'Cereals',
//     '3': 'Fruits',
//     '4': 'Beans',
//     '5': 'Other',
//     '6': 'Roots & Tubers',
//     '7': 'Seeds & Nuts',
//     '8': 'Vegetables'
//   }
// })

// // function for when user selects the Kisumu market
// menu.state('Kisumu', {
//   run: () => {
//     `${categories().then(res => {
//       let newArray = [];
//       for (let i = 0; i < res.length; i++) {
//         newArray.push(`\n${i + 1}. ${res[i].name}`)
//       }
//       let newList = newArray.join();
//       menu.con(newList)
//     })}`
//   },
//   next: {
//     '1': 'Animal Products',
//     '2': 'Cereals',
//     '3': 'Fruits',
//     '4': 'Beans',
//     '5': 'Other',
//     '6': 'Roots & Tubers',
//     '7': 'Seeds & Nuts',
//     '8': 'Vegetables'
//   }
// })

// //function based on "Kampala" choice
// menu.state('Kampala', {
//   run: () => {
//     `${categories().then(res => {
//       let catArr = []
//       for (let i = 0; i < res.length; i++) {
//         catArr.push(`\n${i + 1}. ${res[i].name}`)
//       }
//       let result = catArr.join()
//       menu.con(result)
//     })}`
//   },
//   next: {
//     '1': 'Animal Products',
//     '2': 'Cereals',
//     '3': 'Fruits',
//     '4': 'Beans',
//     '5': 'Other',
//     '6': 'Roots & Tubers',
//     '7': 'Seeds & Nuts',
//     '8': 'Vegetables'
//   }
// })

// //function based on "Mbale" menu choice
// menu.state('Mbale', {
//   run: () => {
//     `${categories().then(res => {
//       let catArr = []
//       for (let i = 0; i < res.length; i++) {
//         catArr.push(`\n${i + 1}. ${res[i].name}`)
//       }
//       let result = catArr.join()
//       menu.con(result)
//     })}`
//   },
//   next: {
//     '1': 'Animal Products',
//     '2': 'Cereals',
//     '3': 'Fruits',
//     '4': 'Beans',
//     '5': 'Other',
//     '6': 'Roots & Tubers',
//     '7': 'Seeds & Nuts',
//     '8': 'Vegetables'
//   }
// })

// menu.state('Animal Products', {
//   run: () => {
//     menu.end(`
//     \n White eggs 110kes
//     \n Exotic eggs 110kes
//     \n Brown eggs 110kes
//     \n Milk 110kes
//     \n Nile perch 110kes
//     \n Tilapia  110kes
//     \n Processed honey 110kes
//     \n Unprocessed honey 110kes
//     \n Beef 110kes
//     \n Goat meat 110kes
//     \n Pork 110kes
//     \n Local chicken 110kes
//     \n Turkey 110kes
//      `)
//   }
// })

// menu.state('Beans', {
//   run: () => {
//     menu.end(`Agwedde beans 110kes`)
//   }
// })

// menu.state('Cereal', {
//   run: () => {
//     menu.end(
//       `\nMaize 110kes
//        \nMillet 110kes
//        \nWhite Rice 100kes
//     `)
//   }
// })



// menu.state('Fruits', {
//   run: () => {
//     menu.end(`Banana 110kes`)
//   }
// })

// menu.state('Other', {
//   run: () => {
//     menu.end(`Coffee 110kes`)
//   }
// })

// menu.state('Roots & Tubers', {
//   run: () => {
//     menu.end(`Sweet potato 110kes`)
//   }
// })

// menu.state('Seeds & Nuts', {
//   run: () => {
//     menu.end(`Sunflower seeds 110kes`)
//   }
// })

// menu.state('Vegetables', {
//   run: () => {
//     menu.end(`Peas 110kes`)
//   }
// })

// menu.state("product", {

menu.state("buyerProduct", {

  run: () => {

    sessionStore[menu.args.sessionId].categoryId = menu.val;
    console.log("PRODUCT()")

    console.log("SESSION STORAGE", sessionStore)

    products(sessionStore[menu.args.sessionId].marketplaceId, sessionStore[menu.args.sessionId].categoryId).then(res => {
      console.log("MARKET RES", res)
      if (res.length < 1) {
        menu.con("No products available. \n0: Start over \n99: Choose another category")
      }
      let lol = [];
      for (let i = 0; i < res.length; i++) {
        lol.push(`\n#${res[i].id}: ${res[i].name} ${res[i].price}
        \n${res[i].seller} \n${res[i].contact_info} `);
      }
      let stringy = lol.join("");

      menu.end(stringy);
    })
      .catch(err => {
        console.log(err)
        menu.end('error')
      })

  },
  next: {
    "0": "start",
    "99": "buyerCategory"
  }
});


/* ----------------------------------------------
      SELLER STATES
--------------------------------------------------*/

menu.state('sellerCountry', {
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
  },
  next: {
    '0': 'start'
  },
  defaultNext: 'sellerMarket'

})



menu.state('sellerMarket', {
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

  },

  next: {
    '0': 'start',
    '99': 'sellerCountry'
  },
  defaultNext: 'sellerCategory'
})


menu.state("sellerCategory", {
  run: () => {
    sessionStore[menu.args.sessionId].marketplaceId = menu.val;
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

  }
});

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
  menu.run(args, resMsg => {
    console.log("PHONE: ", args.phoneNumber);
    console.log("SESSION: ", args.sessionId);
    console.log("SERVICE CODE: ", args.serviceCode);
    console.log("TEXT: ", args.text);
    res.send(resMsg);

  });
})

module.exports = router;

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
async function marketPlaces(countryId) {
  const result = await models.getMarketByCountryId(countryId)
  return result
}

async function categories() {
  const result = await models.getMarketplaceCategories()
  return result
}

async function products() {
  const result = await models.getProducts()
  return result
}

async function countries() {
  const result = await models.getCountries()
  return result
}

let sessions = {};
menu.sessionConfig({
  start: (sessionId, callback) => {
    // initialize current session if it doesn't exist
    // this is called by menu.run()
    if (!(sessionId in sessions)) sessions[sessionId] = {};
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
    "1": "country",
    "2": "goodbye"
  }
});

menu.state('goodbye', {
  run: () => {
    menu.end(`Goodbye`)
  }
})

// functions based on user's menu choice
// const fetchMarketplaces = () => {
//   const country = "Kenya"
//   return db('marketplaces')
// }

menu.state('country', {
  run: () => {
    console.log("COUNTRY()")
    countries().then(res => {
      let lol = [];
      for (let i = 0; i < res.length; i++) {
        lol.push(`\n${res[i].id}: ${res[i].name}`);
      }
      let stringy = lol.join("");

      menu.con(stringy);
    });
  },
  next: {
    '0': 'start'
  },
  defaultNext: 'market'
})

// const fetchProducts = (phoneNumber, sessionId, text) => {
//   const market = "Busia"
//   console.log('FETCH P#: ', phoneNumber)
//   console.log('FETCH SESH: ', sessionId)
//   console.log('FETCH TEXT: ', text)
//   return db('products')
//     .where({ market: market })
// }

menu.state('market', {
  run: () => {

    sessionStore[menu.args.sessionId].countryId = menu.val;
    console.log('SESSION STORE', sessionStore)
    marketPlaces(sessionStore[menu.args.sessionId].countryId)
      .then(res => {
        console.log('MARKET RES', res)
        if (res.length < 1) {
          menu.end('No marketplaces in that country')
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

    // menu.session.set(menu.args.sessionId, 'marketplace_id', menu.val)
    //   .then(res => console.log("set market id to ", res))
    //   .catch(err => console.log("error setting ", err))
    // menu.session.get("marketplace_id")
    // console.log("SESSION MARKET ID", menu.session.get("marketplace_id"))
    // console.log("RETRIEVE KEY", menu.session.get(menu.args.sessionId, 'marketplace_id'), (err) => handleError(err))

    menu.end(`You chose item with the id ${sessionStore[menu.args.sessionId].marketId}`)

  },

  next: {
    '0': 'start'
  },
  defaultNext: 'category'
})

menu.state("category", {
  run: () => {
    // menu.session.set( "marketplace_id", parseInput(menu.args.text), (err) => handleError(err) );
    menu.end('stop')
    // `${products(sessionStore[menu.args.sessionId].marketId).then(res => {
    //   let lol = [];
    //   for (let i = 0; i < res.length; i++) {
    //     lol.push(`\n#${res[i].id}: ${res[i].name}`);
    //   }
    //   let stringy = lol.join();
    //   menu.con(stringy);
    // })}`;

  },
  next: {
    "0": "start"
  },
  defaultNext: "product"
});

menu.state('product', {
  run: () => {
    sessionStore[menu.args.sessionId].productId = menu.val;
    console.log('SESSION STORAGE ', sessionStore)
    menu.end(`You chose the item with the id ${sessionStore[menu.args.sessionId].productId}`)
  }
})




// const parseInput = str => {
//   let array
//   array = str.split('*')
//   return array[array.length - 1]
// }

// const handleError = err => {
//   console.log('ERROR', err)
//   menu.end('An error occurred. Check the logs.')
// }

// menu.state('market', {
//   run: () => {
//     console.log('MARKET()')
//     marketPlaces().then(res => {
//       let lol = []
//       for (let i = 0; i < res.length; i++) {
//         lol.push(`\n${i + 1}. ${res[i].name}`)
//       }
//       let stringy = lol.join("")
//       menu.con(stringy)
//     })
//   },
//   next: {
//     '0': 'start'
//   },
//   defaultNext: 'category'
// })

// menu.state('category', {
//   run: () => {
//     console.log('CATEGORY()')
//     console.log('CATEGORY TEXT', menu.args.text)
//     console.log("SESSION", menu.session)
//     console.log('CATEGORY VAL', menu.val)
//     console.log('GLOBAL SESSIONS', sessions)
//     menu.session.set(menu.args.sessionId, 'marketplace_id', menu.val)
//       .then(res => console.log('SET MARKET ID TO ', res))
//       .catch(err => console.log('ERROR SETTING ', err))
//     // menu.session.get("marketplace_id")
//     // console.log('SESSION MARKET ID', menu.session.get('marketplace_id'))
//     // console.log("RETRIEVED", menu.session.get(menu.args.sessionId, 'marketplace_id'), (err) => handleError(err))
//     menu.end("stop")
//   },

//   next: {
//     '0': 'start'
//   },
//   defaultNext: 'product'
// })



menu.state(`Busia`, {
  run: () => {
    `${categories().then(res => {
      let newArray = [];
      for (let i = 0; i < res.length; i++) {
        newArray.push(`\n${i + 1}. ${res[i].name}`)
      }
      let newList = newArray.join();
      menu.con(newList)
    })}`
  },
  next: {
    '1': 'Animal Products',
    '2': 'Cereals',
    '3': 'Fruits',
    '4': 'Beans',
    '5': 'Other',
    '6': 'Roots & Tubers',
    '7': 'Seeds & Nuts',
    '8': 'Vegetables'
  }
})

menu.state('Tororo', {
  run: () => {
    `${categories().then(res => {
      let newArray = [];
      for (let i = 0; i < res.length; i++) {
        newArray.push(`\n${i + 1}. ${res[i].name}`)
      }
      let newList = newArray.join();
      menu.con(newList)
    })}`
  },
  next: {
    '1': 'Animal Products',
    '2': 'Cereals',
    '3': 'Fruits',
    '4': 'Beans',
    '5': 'Other',
    '6': 'Roots & Tubers',
    '7': 'Seeds & Nuts',
    '8': 'Vegetables'
  }
})

menu.state('Soroti', {
  run: () => {
    `${categories().then(res => {
      let newArray = [];
      for (let i = 0; i < res.length; i++) {
        newArray.push(`\n${i + 1}. ${res[i].name}`)
      }
      let newList = newArray.join();
      menu.con(newList)
    })}`
  },
  next: {
    '1': 'Animal Products',
    '2': 'Cereals',
    '3': 'Fruits',
    '4': 'Beans',
    '5': 'Other',
    '6': 'Roots & Tubers',
    '7': 'Seeds & Nuts',
    '8': 'Vegetables'
  }
})

menu.state('Bungoma', {
  run: () => {
    `${categories().then(res => {
      let newArray = [];
      for (let i = 0; i < res.length; i++) {
        newArray.push(`\n${i + 1}. ${res[i].name}`)
      }
      let newList = newArray.join();
      menu.con(newList)
    })}`
  },
  next: {
    '1': 'Animal Products',
    '2': 'Cereals',
    '3': 'Fruits',
    '4': 'Beans',
    '5': 'Other',
    '6': 'Roots & Tubers',
    '7': 'Seeds & Nuts',
    '8': 'Vegetables'
  }
})

// function for when user selects the Eldoret market
menu.state('Eldoret', {
  run: () => {
    `${categories().then(res => {
      let newArray = [];
      for (let i = 0; i < res.length; i++) {
        newArray.push(`\n${i + 1}. ${res[i].name}`)
      }
      let newList = newArray.join();
      menu.con(newList)
    })}`
  },
  next: {
    '1': 'Animal Products',
    '2': 'Cereals',
    '3': 'Fruits',
    '4': 'Beans',
    '5': 'Other',
    '6': 'Roots & Tubers',
    '7': 'Seeds & Nuts',
    '8': 'Vegetables'
  }
})

// function for when user selects the Kisumu market
menu.state('Kisumu', {
  run: () => {
    `${categories().then(res => {
      let newArray = [];
      for (let i = 0; i < res.length; i++) {
        newArray.push(`\n${i + 1}. ${res[i].name}`)
      }
      let newList = newArray.join();
      menu.con(newList)
    })}`
  },
  next: {
    '1': 'Animal Products',
    '2': 'Cereals',
    '3': 'Fruits',
    '4': 'Beans',
    '5': 'Other',
    '6': 'Roots & Tubers',
    '7': 'Seeds & Nuts',
    '8': 'Vegetables'
  }
})

//function based on "Kampala" choice
menu.state('Kampala', {
  run: () => {
    `${categories().then(res => {
      let catArr = []
      for (let i = 0; i < res.length; i++) {
        catArr.push(`\n${i + 1}. ${res[i].name}`)
      }
      let result = catArr.join()
      menu.con(result)
    })}`
  },
  next: {
    '1': 'Animal Products',
    '2': 'Cereals',
    '3': 'Fruits',
    '4': 'Beans',
    '5': 'Other',
    '6': 'Roots & Tubers',
    '7': 'Seeds & Nuts',
    '8': 'Vegetables'
  }
})

//function based on "Mbale" menu choice
menu.state('Mbale', {
  run: () => {
    `${categories().then(res => {
      let catArr = []
      for (let i = 0; i < res.length; i++) {
        catArr.push(`\n${i + 1}. ${res[i].name}`)
      }
      let result = catArr.join()
      menu.con(result)
    })}`
  },
  next: {
    '1': 'Animal Products',
    '2': 'Cereals',
    '3': 'Fruits',
    '4': 'Beans',
    '5': 'Other',
    '6': 'Roots & Tubers',
    '7': 'Seeds & Nuts',
    '8': 'Vegetables'
  }
})

// function for when user selects the Eldoret market
menu.state('Eldoret', {
  run: () => {
    `${categories().then(res => {
      let newArray = [];
      for (let i = 0; i < res.length; i++) {
        newArray.push(`\n${i + 1}. ${res[i].name}`)
      }
      let newList = newArray.join();
      menu.con(newList)
    })}`
  },
  next: {
    '1': 'Animal Products',
    '2': 'Cereals',
    '3': 'Fruits',
    '4': 'Beans',
    '5': 'Other',
    '6': 'Roots & Tubers',
    '7': 'Seeds & Nuts',
    '8': 'Vegetables'
  }
})

// function for when user selects the Kisumu market
menu.state('Kisumu', {
  run: () => {
    `${categories().then(res => {
      let newArray = [];
      for (let i = 0; i < res.length; i++) {
        newArray.push(`\n${i + 1}. ${res[i].name}`)
      }
      let newList = newArray.join();
      menu.con(newList)
    })}`
  },
  next: {
    '1': 'Animal Products',
    '2': 'Cereals',
    '3': 'Fruits',
    '4': 'Beans',
    '5': 'Other',
    '6': 'Roots & Tubers',
    '7': 'Seeds & Nuts',
    '8': 'Vegetables'
  }
})

//function based on "Kampala" choice
menu.state('Kampala', {
  run: () => {
    `${categories().then(res => {
      let catArr = []
      for (let i = 0; i < res.length; i++) {
        catArr.push(`\n${i + 1}. ${res[i].name}`)
      }
      let result = catArr.join()
      menu.con(result)
    })}`
  },
  next: {
    '1': 'Animal Products',
    '2': 'Cereals',
    '3': 'Fruits',
    '4': 'Beans',
    '5': 'Other',
    '6': 'Roots & Tubers',
    '7': 'Seeds & Nuts',
    '8': 'Vegetables'
  }
})

//function based on "Mbale" menu choice
menu.state('Mbale', {
  run: () => {
    `${categories().then(res => {
      let catArr = []
      for (let i = 0; i < res.length; i++) {
        catArr.push(`\n${i + 1}. ${res[i].name}`)
      }
      let result = catArr.join()
      menu.con(result)
    })}`
  },
  next: {
    '1': 'Animal Products',
    '2': 'Cereals',
    '3': 'Fruits',
    '4': 'Beans',
    '5': 'Other',
    '6': 'Roots & Tubers',
    '7': 'Seeds & Nuts',
    '8': 'Vegetables'
  }
})

menu.state('Animal Products', {
  run: () => {
    menu.end(`
    \n White eggs 110kes
    \n Exotic eggs 110kes
    \n Brown eggs 110kes
    \n Milk 110kes
    \n Nile perch 110kes
    \n Tilapia  110kes
    \n Processed honey 110kes
    \n Unprocessed honey 110kes
    \n Beef 110kes
    \n Goat meat 110kes
    \n Pork 110kes
    \n Local chicken 110kes
    \n Turkey 110kes
     `)
  }
})

menu.state('Beans', {
  run: () => {
    menu.end(`Agwedde beans 110kes`)
  }
})

menu.state('Cereal', {
  run: () => {
    menu.end(
      `\nMaize 110kes
       \nMillet 110kes
       \nWhite Rice 100kes
    `)
  }
})



menu.state('Fruits', {
  run: () => {
    menu.end(`Banana 110kes`)
  }
})

menu.state('Other', {
  run: () => {
    menu.end(`Coffee 110kes`)
  }
})

menu.state('Roots & Tubers', {
  run: () => {
    menu.end(`Sweet potato 110kes`)
  }
})

menu.state('Seeds & Nuts', {
  run: () => {
    menu.end(`Sunflower seeds 110kes`)
  }
})

menu.state('Vegetables', {
  run: () => {
    menu.end(`Peas 110kes`)
  }
})

menu.on('error', err => {
  console.log(err);
})

router.post('*', (req, res) => {
  let args = {
    phoneNumber: req.body.phoneNumber,
    sessionId: req.body.sessionId,
    serviceCode: req.body.serviceCode,
    text: req.body.text
  }

  menu.run(args, resMsg => {
    // console.log('in menu.run', args)
    res.send(resMsg);
    let sessionId = menu.args.sessionId;
    let phoneNumber = menu.args.phoneNumber;
    let text = menu.args.text;
    // let text = req.body.text.toString();

    // menu.session.start(() => {
    //   console.log('menu.session.start()')
    //   return
    // })
    //   .then(res => console.log('menu.session.start ok'))
    //   .catch(err => console.log('menu.session.start failed'))

    // let newArray = [];
    // console.log('sessions', session);
    // db("sessions")
    //   .insert(session)
    //   .then(res => {
    //     menu.end("session added successfully!");
    //   })
    //   .catch(err => {
    //     menu.end("Fail");
    //   });
  });
})


module.exports = router;

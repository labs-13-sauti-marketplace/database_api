const router = require("express").Router();
const UssdMenu = require('ussd-menu-builder')
const models = require("./models");
const sessionModel = require('./sessions-model')
const menu = new UssdMenu()

const bodyParser = require('body-parser')

const db = require('../data/dbConfig')

/*
------------------------------------------------------------------------------------------
Menu & State Generators
------------------------------------------------------------------------------------------
// */
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
// create a USSD menu string from a set of db rows
function generateMenuStringFromDbRows (dbRows) {
  let stringy = ''
  dbRows.forEach((row, i) => {
    const digit = i + 1
    stringy += `\n${digit}. ${row.name}`
  })
  return stringy
}

// create a "next" route option for each USSD menu option from a set of db rows
function generateNextRoutesFromDbRows (dbRows, nextRoute) {
  const next = {}
  dbRows.forEach((row, i) => {
    next[i.toString()] = nextRoute
  })
  return next
}

// find the database row that corresponds to a the USSD menu selection
function findDbRowForMenuSelection (menuSelection, dbRows) {
  // convert the selection to a number
  const i = parseInt(menuSelection)
  // find that row from the rows
  return dbRows[i] 
}

/*
------------------------------------------------------------------------------------------
Buyer - Categories & Products
------------------------------------------------------------------------------------------
*/

async function getCategoriesForMarketplace (marketplaceId) {
  // ... need to get categories from database
  // SELECT * FROM categories WHERE marketplace_id = marketplaceId ORDER BY name
  // ... for now, we'll return these hard-coded
  return [
    { id: 1, name: 'Animal Product' },
    { id: 2, name: 'Cereals' },
    { id: 3, name: 'Fruits' },
    { id: 4, name: 'Beans' }
  ]
}

/*
------------------------------------------------------------------------------------------
Routes 
------------------------------------------------------------------------------------------
*/
async function buildMenu () {
  // WELCOME!
  menu.startState({
    run: () => {
      menu.con(`\n1. Go To Market \n2. goodbye`)
    },
    next: {
      '1': 'position',
      '2': 'goodbye'
    }
  })

  // POSITION
  menu.state('position', {
    run: () => {
      menu.con(`\n1. buyer \n2. seller `)
    },
    next: {
      '1': 'buyerMarketplace',
      '2': 'sellerMarketplace'
    }
  })

  // BUYER: CHOOSE MARKETPLACE
  const buyerMarketsDbRows = await model.getMarkets()
  const buyerMarketplaceRoute = (showErrorMessage) => {
    return {
      run: async () => {
        const menuStr = generateMenuStringFromDbRows(buyerMarketsDbRows)
        if (showErrorMessage) {
          menuStr = `Invalid entry.\n` + menuStr
        }
        menu.con(menuStr)
      },
      next: generateNextRoutesFromDbRows(buyerMarketsDbRows),
      defaultNext: 'invalidBuyerMarketplace'
    }
  }
  menu.state('buyerMarketplace', buyerMarketplaceRoute())
  menu.state('invalidBuyerMarketplace', buyerMarketplaceRoute(true))

  // BUYER: CATEGORIES
  menu.state(`buyerCategories`, {
    run: () => {
      // what did they enter?
      const selection = menu.val
      // what does that value map to?
      const marketplaceDbRows = await model.getMarkets()
      const marketplace = findDbRowForMenuSelection(selection, marketplaceDbRows)
      // if no value matches this selection, give invalid message
      if (!marketplace) {
        
      }
      // what categories exist in this marketplace?
      const categoryDbRows = getCategoriesForMarketplace(marketplace.id)
      const menuStr = await generateMenuStringFromDbRows(categoryDbRows)
      menu.con(menu)
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

}


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))



const fetchProducts = (phoneNumber, sessionId, text) => {
  const market = "Busia"
  console.log('FETCH P#: ', phoneNumber)
  console.log('FETCH SESH: ', sessionId)
  console.log('FETCH TEXT: ', text)
  return db('products')
    .where({ market: market })
}

// functions based on user's menu choice
menu.state('goodbye', {
  run: () => {
    menu.end(`goodbye`)
  }
})


// function base on "buyer" choice
menu.state('buyer', {
  run: async () => {
    await menuRunFunctionFromModelGetter(marketPlaces)
  },
  next: {
    '1': 'Busia',
    '2': 'Tororo',
    '3': 'Mbale',
    '4': 'Eldoret',
    '5': 'Kisumu',
    '6': 'Soroti',
    '7': 'Bungoma',
    '8': 'Kampala'
  }
});


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
    console.log('in menu.run', args)
    res.send(resMsg);
    let sessionId = menu.args.sessionId;
    let phoneNumber = menu.args.phoneNumber;
    let text = menu.args.text;
    // let text = req.body.text.toString();
        let session = {
          sessionId: sessionId,
          phoneNumber: phoneNumber,
          text: text,
        };
        // let newArray = [];
        console.log('sessions', session);
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

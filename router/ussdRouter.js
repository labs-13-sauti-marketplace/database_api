const router = require("express").Router();
const UssdMenu = require('ussd-menu-builder')
const models = require("./models");
const sessionModel = require('./sessions-model')
const menu = new UssdMenu()

const bodyParser = require('body-parser')
const db = require('../data/dbConfig')

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

function findDbRowForMenuSelection (menuSelection, dbRows) {
  // convert the number of the selection to the index of the appropriate database row.
  // we subtract 1 because we added 1 when we made the options (because 0 is the first index number, but "1" is the first option)
  const i = parseInt(menuSelection) - 1
  // if the menu selection didn't result in a valid index, return null
  if (Number.isNaN(i)) {
    return null
  }
  // find that row from the rows
  return dbRows[i] 
}

function prependInvalidMessageToMenu (menuStr) {
  return 'Invalid selection. Please try again\n' + (menuStr || '')
}

function appendNavigationMessage (menuStr) {
  return menuStr + `\n\n[99] Back [0] Home` 
}

async function checkForNavigationState (menu) {
  const selection = menu.val
  if (parseInt(selection) === 99) {
    // find the previous state from the session
    const backState = await getSessionPreviousState()
    return backState
  } 
  if (parseInt(selection) === 0) {
    return 'position'
  }
}

/*
------------------------------------------------------------------------------------------
User Sessions
------------------------------------------------------------------------------------------
*/
async function updateSessionPreviousState (route) {
  // save this route as the user's previous state
}

async function getSessionPreviousState () {
  // return the name of the previous state
}

/*
------------------------------------------------------------------------------------------
Buyer - Categories & Products
------------------------------------------------------------------------------------------
*/

async function getCategoriesForMarket (marketId) {
  // ... need to get categories from database
  // SELECT * FROM categories WHERE market_id = marketId ORDER BY name
  // ... for now, we'll return these hard-coded
  return models.getCat()
}

async function getProductsForCategory (categoryId) {
  // ... fetch from database
  // ... need to filter by category id
  return models.getProducts()
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
      '1': 'buyerMarkets',
      '2': 'sellerMarkets'
    }
  })

  /*
  BUYER: CHOOSE MARKET
  */
  const marketsDbRows = await models.getMarkets()
  const buyerMarketsState = (invalidMessage) => {
    return {
      run: async () => {
        console.log(menu)
        let menuStr = await generateMenuStringFromDbRows(marketsDbRows)
        // show any invalid error messages
        if (invalidMessage) {
          menuStr = prependInvalidMessageToMenu(menuStr)
        }
        // send menu
        menuStr = appendNavigationMessage(menuStr)
        menu.con(menuStr)
      },
      next: {
        '*': async () => {
          // check for navigation state
          const navState = checkForNavigationState(menu)
          if (navState) {
            return navState
          }
          // check if the entry provided was a valid entry
          const selection = menu.val
          const market = findDbRowForMenuSelection(selection, marketsDbRows)
          // if no value matches this selection, send back
          if (!market) {
            return 'invalidBuyerMarkets'
          }
          // otherwise, send to the appropriate state
          const nextState = `buyerCategories:${market.id}`
          await updateSessionPreviousState(nextState)
          return nextState
        }
      }
    }
  } 
  menu.state('buyerMarkets', buyerMarketsState())
  menu.state('invalidBuyerMarkets', buyerMarketsState(true))

  /*
  BUYER: CATEGORIES
  */
  const buyerCategoriesState = async (marketId, invalidMessage) => {
    // get the records from the database
    const categoryDbRows = await getCategoriesForMarket(marketId)
    // return the state
    return {
      run: async () => {
        let menuStr = generateMenuStringFromDbRows(categoryDbRows)
        // show any invalid error messages
        if (invalidMessage) {
          menuStr = prependInvalidMessageToMenu(menuStr)
        }
        // send menu
        menuStr = appendNavigationMessage(menuStr)
        menu.con(menuStr)
      },
      next: {
        '*': async () => {
          // check for navigation state
          const navState = checkForNavigationState(menu)
          if (navState) {
            return navState
          }
          // check if the entry provided was a valid entry
          const selection = menu.val
          const category = findDbRowForMenuSelection(selection, categoryDbRows)
          // if no value matches this selection, send back 
          if (!category) {
            return `invalidBuyerCategories:${marketId}`
          }
          // otherwise, send to the appropriate state
          const nextState = `buyerProducts:${category.id}`
          await updateSessionPreviousState(nextState)
          return nextState
        }
      }
    }
  }
  // make routes for each market
  for (let market of marketsDbRows) {
    const state = await buyerCategoriesState(market.id)
    const invalidState = await buyerCategoriesState(market.id, true)
    menu.state(`buyerCategories:${market.id}`, state)
    menu.state(`invalidBuyerCategories:${market.id}`, invalidState)  
  }

  /*
  BUYER: PRODUCTS
  */
  const buyerProductsState = async (categoryId, invalidMessage) => {
    // get the records from the database
    const productsDbRows = await getProductsForCategory(categoryId)
    // return the state
    return {
      run: async () => {
        let menuStr = generateMenuStringFromDbRows(productsDbRows)
        // show any invalid error messages
        if (invalidMessage) {
          menuStr = prependInvalidMessageToMenu(menuStr)
        }
        // send menu
        menuStr = appendNavigationMessage(menuStr)
        menu.con(menuStr)
      },
      next: {
        '*': async () => {
          // check for navigation state
          const navState = checkForNavigationState(menu)
          if (navState) {
            return navState
          }
          // check if the entry provided was a valid entry
          const selection = menu.val
          const product = findDbRowForMenuSelection(selection, productsDbRows)
          // if no value matches this selection, send back
          if (!product) {
            return `invalidBuyerProducts:${categoryId}`
          }
          // otherwise, send to the appropriate state
          const nextState = `buyerProductSellerInfo:${product.seller_id}`
          await updateSessionPreviousState(nextState)
          return nextState
        }
      }
    }
  }
  // make routes for each category
  const allCategories = await models.getCat()
  for (let category of allCategories) {
    const state = await buyerProductsState(category.id)
    const invalidState = await buyerProductsState(category.id, true)
    menu.state(`buyerProducts:${category.id}`, state)
    menu.state(`invalidBuyerProducts:${category.id}`, invalidState)  
  }

  /*
  BUYER: PRODUCT SELLER INFO
  */
  const allSellers = await models.getSellers()
  const buyerProductSellerInfoState = async (sellerId) => {
    // get the records from the database
    const seller = allSellers.find(seller => seller.id === sellerId)
    // return the state
    return {
      run: async () => {
        let menuStr
        if (!seller) {
          menuStr = '\nWe cannot find contact information for this seller'
        } else {
          menuStr = `\nSELLER INFORMATION:\n\n${seller.name}\n${seller.phone}`
        }
        menuStr = appendNavigationMessage(menuStr)
        menu.con(menuStr)
      },
      next: {
        '*': async () => {
          // check for navigation state
          const navState = checkForNavigationState(menu)
          if (navState) {
            return navState
          }
        }
      }
    }
  }
  // make routes for each seller
  for (let seller of allSellers) {
    menu.state(`buyerProductSellerInfo:${seller.id}`, buyerProductSellerInfoState(seller.id))
  }
}




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

menu.on('error', err => {
  console.log(err);
})

/*
------------------------------------------------------------------------------------------
Express Router
------------------------------------------------------------------------------------------
*/
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.post('*', async (req, res) => {  
  let args = {
    phoneNumber: req.body.phoneNumber,
    sessionId: req.body.sessionId,
    serviceCode: req.body.serviceCode,
    text: req.body.text
  }

  // build the menu
  await buildMenu()

  // serve the menu
  menu.run(args, resMsg => {
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
const router = require("express").Router();

const models = require("./models");
const menu = new UssdMenu()


const bodyParser = require('body-parser')
const UssdMenu = require('ussd-menu-builder');
// const db = require('../data/dbConfig')

let menu = new UssdMenu();

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// pulling in helper functions
async function marketPlaces() {
  const result = await models.getMarkets()
  return result
}

async function categories() {
  const result = await models.getCat()
  return result
}

async function products() {
  const result = await models.getProducts()
  return result
}

// setting initial state of menu
menu.startState({
  run: () => {
    menu.con(`\n1. Go To Market \n2. goodbye`)
  },
  next: {
    '1': 'position',
    '2': 'goodbye'
  }
})

// functions based on user's menu choice
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

// function base on "buyer" choice
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



menu.on('error', err => {
  console.log(err);
})

router.post('*', (req, res) => {
  menu.run(req.body, ussdResult => {
    res.send(ussdResult);
  })
})

module.exports = router;

const router = require("express").Router();
const UssdMenu = require('ussd-menu-builder')
const models = require("./models");
const sessionModel = require('./sessions-model')
const menu = new UssdMenu()

const bodyParser = require('body-parser')

const db = require('../data/dbConfig')

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

// setting initial state of menu
menu.startState({
  run: () => {
    menu.con(`\n1. Go To Market \n2. goodbye`);
  },
  next: {
    "1": "position",
    "2": "goodbye"
  }
});

// functions based on user's menu choice
menu.state("goodbye", {
  run: () => {
    menu.end(`goodbye`);
  }
});

menu.state("position", {
  run: () => {
    menu.con(`\n1. buyer \n2. seller `);
  },
  next: {
    "1": "market",
    "2": "seller"
  }
});

const parseInput = str => {
  let array;
  array = str.split("*")
  return array[array.length - 1]
}

const fetchProducts = (phoneNumber, sessionId, text) => {
  const market = "Busia"
  console.log('FETCH P#: ', phoneNumber)
  console.log('FETCH SESH: ', sessionId)
  console.log('FETCH TEXT: ', text)
  return db('products')
    .where({ market: market })
}

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

menu.state('market', {
  run: () => {
    `${marketPlaces().then(res => {
      let lol = [];
      for (let i = 0; i < res.length; i++) {
        lol.push(`\n#${res[i].id}: ${res[i].name}`);
      }
      let stringy = lol.join();
      
      menu.con(stringy);
    })}`;
  },
  next: {
    '0': 'start'
  },
  defaultNext: 'category'
})

menu.state('category', {
  run: () => {
    // menu.session.set('marketplace_id', parseInput(menu.args.text), (err) => handleError(err))
    // menu.session.get("marketplace_id")
    `${categories().then(res => {
      let lol = []
      for (let i = 0; i < res.length; i++) {
        lol.push(`\n#${res[i].id}: ${res[i].name}`)
      }
      let stringy = lol.join()
      menu.con(stringy)
    })}`
  },
  next: {
    '0': 'start'
  },
  defaultNext: 'product'
})



menu.state("category", {
  run: () => {
    // menu.session.set( "marketplace_id", parseInput(menu.args.text), (err) => handleError(err) );
    
    `${models.getMarketplaceCategories(parseInput(menu.args.text)).then(res => {
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

menu.state("Tororo", {
  run: () => {
    `${categories().then(res => {
      let newArray = [];
      for (let i = 0; i < res.length; i++) {
        newArray.push(`\n${i + 1}. ${res[i].name}`);
      }
      let newList = newArray.join();
      menu.con(newList);
    })}`;
  },
  next: {
    "1": "Animal Products",
    "2": "Cereals",
    "3": "Fruits",
    "4": "Beans",
    "5": "Other",
    "6": "Roots & Tubers",
    "7": "Seeds & Nuts",
    "8": "Vegetables"
  }
});

menu.state("Soroti", {
  run: () => {
    `${categories().then(res => {
      let newArray = [];
      for (let i = 0; i < res.length; i++) {
        newArray.push(`\n${i + 1}. ${res[i].name}`);
      }
      let newList = newArray.join();
      menu.con(newList);
    })}`;
  },
  next: {
    "1": "Animal Products",
    "2": "Cereals",
    "3": "Fruits",
    "4": "Beans",
    "5": "Other",
    "6": "Roots & Tubers",
    "7": "Seeds & Nuts",
    "8": "Vegetables"
  }
});

menu.state("Bungoma", {
  run: () => {
    `${categories().then(res => {
      let newArray = [];
      for (let i = 0; i < res.length; i++) {
        newArray.push(`\n${i + 1}. ${res[i].name}`);
      }
      let newList = newArray.join();
      menu.con(newList);
    })}`;
  },
  next: {
    "1": "Animal Products",
    "2": "Cereals",
    "3": "Fruits",
    "4": "Beans",
    "5": "Other",
    "6": "Roots & Tubers",
    "7": "Seeds & Nuts",
    "8": "Vegetables"
  }
});

// function for when user selects the Eldoret market
menu.state("Eldoret", {
  run: () => {
    `${categories().then(res => {
      let newArray = [];
      for (let i = 0; i < res.length; i++) {
        newArray.push(`\n${i + 1}. ${res[i].name}`);
      }
      let newList = newArray.join();
      menu.con(newList);
    })}`;
  },
  next: {
    "1": "Animal Products",
    "2": "Cereals",
    "3": "Fruits",
    "4": "Beans",
    "5": "Other",
    "6": "Roots & Tubers",
    "7": "Seeds & Nuts",
    "8": "Vegetables"
  }
});

// function for when user selects the Kisumu market
menu.state("Kisumu", {
  run: () => {
    `${categories().then(res => {
      let newArray = [];
      for (let i = 0; i < res.length; i++) {
        newArray.push(`\n${i + 1}. ${res[i].name}`);
      }
      let newList = newArray.join();
      menu.con(newList);
    })}`;
  },
  next: {
    "1": "Animal Products",
    "2": "Cereals",
    "3": "Fruits",
    "4": "Beans",
    "5": "Other",
    "6": "Roots & Tubers",
    "7": "Seeds & Nuts",
    "8": "Vegetables"
  }
});

//function based on "Kampala" choice
menu.state("Kampala", {
  run: () => {
    `${categories().then(res => {
      let catArr = [];
      for (let i = 0; i < res.length; i++) {
        catArr.push(`\n${i + 1}. ${res[i].name}`);
      }
      let result = catArr.join();
      menu.con(result);
    })}`;
  },
  next: {
    "1": "Animal Products",
    "2": "Cereals",
    "3": "Fruits",
    "4": "Beans",
    "5": "Other",
    "6": "Roots & Tubers",
    "7": "Seeds & Nuts",
    "8": "Vegetables"
  }
});

//function based on "Mbale" menu choice
menu.state("Mbale", {
  run: () => {
    `${categories().then(res => {
      let catArr = [];
      for (let i = 0; i < res.length; i++) {
        catArr.push(`\n${i + 1}. ${res[i].name}`);
      }
      let result = catArr.join();
      menu.con(result);
    })}`;
  },
  next: {
    "1": "Animal Products",
    "2": "Cereals",
    "3": "Fruits",
    "4": "Beans",
    "5": "Other",
    "6": "Roots & Tubers",
    "7": "Seeds & Nuts",
    "8": "Vegetables"
  }
});

// function for when user selects the Eldoret market
menu.state("Eldoret", {
  run: () => {
    `${categories().then(res => {
      let newArray = [];
      for (let i = 0; i < res.length; i++) {
        newArray.push(`\n${i + 1}. ${res[i].name}`)
      }
      let newList = newArray.join();
      menu.con(newList);
    })}`;
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
});

// function for when user selects the Kisumu market
menu.state("Kisumu", {
  run: () => {
    `${categories().then(res => {
      let newArray = [];
      for (let i = 0; i < res.length; i++) {
        newArray.push(`\n${i + 1}. ${res[i].name}`)
      }
      let newList = newArray.join();
      menu.con(newList);
    })}`;
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
});

//function based on "Kampala" choice
menu.state("Kampala", {
  run: () => {
    `${categories().then(res => {
      let catArr = [];
      for (let i = 0; i < res.length; i++) {
        catArr.push(`\n${i + 1}. ${res[i].name}`);
      }
      let result = catArr.join();
      menu.con(result);
    })}`;
  },
  next: {
    "1": "Animal Products",
    "2": "Cereals",
    "3": "Fruits",
    "4": "Beans",
    "5": "Other",
    "6": "Roots & Tubers",
    "7": "Seeds & Nuts",
    "8": "Vegetables"
  }
});

//function based on "Mbale" menu choice
menu.state("Mbale", {
  run: () => {
    `${categories().then(res => {
      let catArr = [];
      for (let i = 0; i < res.length; i++) {
        catArr.push(`\n${i + 1}. ${res[i].name}`);
      }
      let result = catArr.join();
      menu.con(result);
    })}`;
  },
  next: {
    "1": "Animal Products",
    "2": "Cereals",
    "3": "Fruits",
    "4": "Beans",
    "5": "Other",
    "6": "Roots & Tubers",
    "7": "Seeds & Nuts",
    "8": "Vegetables"
  }
});

menu.state("Animal Products", {
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
     `);
  }
});

menu.state("Beans", {
  run: () => {
    menu.end(`Agwedde beans 110kes`);
  }
});

menu.state("Cereal", {
  run: () => {
    menu.end(
      `\nMaize 110kes
       \nMillet 110kes
       \nWhite Rice 100kes
    `
    );
  }
});

menu.state("Fruits", {
  run: () => {
    menu.end(`Banana 110kes`);
  }
});

menu.state("Other", {
  run: () => {
    menu.end(`Coffee 110kes`);
  }
});

menu.state("Roots & Tubers", {
  run: () => {
    menu.end(`Sweet potato 110kes`);
  }
});

menu.state("Seeds & Nuts", {
  run: () => {
    menu.end(`Sunflower seeds 110kes`);
  }
});

menu.state("Vegetables", {
  run: () => {
    menu.end(`Peas 110kes`);
  }
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

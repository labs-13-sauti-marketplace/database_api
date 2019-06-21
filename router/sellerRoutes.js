//testing for seller posts and dynamic menu

menu.startState({
  run: () => {
    // use menu.con() to send response without terminating session
    menu.con("Welcome. Choose option:" + "\n1. Buyer" + "\n2. Seller");
  },
  // next object links to next state based on user input
  next: {
    "1": "markets",
    "2": "postForSale"
  }
});

menu.state("markets", {
  run: () => {
    const market = "Bujumbaru";

    // const markets = await db.find("products")
    // .where({menu.val});
    menu.con(`The products available at ${market}`);
    // return markets;
  },
  
  next: () => {
    const market = "Bujumbaru";
    
    db("products")
      .where({ market: market })
      .then(products => {
        const options = {};
        // console.log("DBPRODUCTS", products)
        for (let i = 0; i < products.length; i++) {
          options[i + 1] = `${products[i].product} ${products[i].price} `;

        }
        console.log("OPTIONS", options)
        return options;
      });

  }
});

menu.state("Test", {
  run: () => {
    menu.end("You made it!");
  }
});

menu.state("postForSale", {
  run: () => {
    menu.con("Enter a country:");
  },
  next: {
    "*[a-zA-Z]+": "addCountry"
  }
});

// nesting states
menu.state("addCountry", {
  run: () => {
    // use menu.val to access user input value
    let country = menu.val;
    const product = {
      country: country,
      market: "market",
      product: "product",
      price: "price"
    };
    db("products")
      .insert(product)
      .then(res => {
        menu.end("Country added successfully!");
      })
      .catch(err => {
        menu.end("Fail");
      });
  }
});

// Registering USSD handler with Express

app.post("*", function(req, res) {
  menu.run(req.body, ussdResult => {
    res.send(ussdResult);
  });
  //   let post = req.body;
  //   addPost(post)
  //     .then(saved => {
  //       res.status(201).json(saved);
  //     })
  //     .catch(({ message }) => {
  //       res.status(503).json({ message });
  //     });
});
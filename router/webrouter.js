const db = require("../data/dbConfig");
const webRouter = require("express").Router();
const countries = require("./countries-model");
const models = require("./models");
const sessions = require("./sessions-model");
const markets = require("./markets-model");

webRouter.get("/categories", async (req, res) => {
  try {
    let result = await db("categories");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

webRouter.get("/country/:id", (req, res) => {
  const { id } = req.params;
  const country = [];
  db("countries")
    .where("id", id)
    .then(country => {
      country.push(country[0]);
    })
    .then(
      db("marketplaces")
        .where("country_id", id)
        .then(marketplaces => {
          country[0].marketplaces = marketplaces;
        })
        .then(() => {
          res.json(country);
        })
    )
    .catch(err => {
      res.status(500).json({ err: "err" });
    });
});

webRouter.post("/addmarket", (req, res) => {
  console.log("we are trying to add a market");
  let post = req.body;
  addPosts(post)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(({ message }) => {
      res.status(503).json({ message });
    });
});

async function addPosts(post) {
  console.log("before");
  const func = await db("marketplaces")
    .insert(post)
    .where({ market: markets });
  console.log("after");
  return `New Post ID: ${post.name} : Added :)`;
}

webRouter.get("/products/:id/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let result = await db.getProductByMarketAndCatId(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

webRouter.get("/countries", async (req, res) => {
  try {
    let result = await db("countries");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
webRouter.post("/addcountry", (req, res) => {
  console.log("we are trying to add a market");
  let post = req.body;
  addPost(post)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(({ message }) => {
      res.status(503).json({ message });
    });
});

async function addPost(post) {
  console.log("before");
  const func = await db("countries")
    .insert(post)
    .where({ country: countries });
  console.log("after");
  return `New Post ID: ${post.name} : Added :)`;
}

webRouter.delete("/deletecountry/:id", (req, res) => {
  let deleted = req.params.id;
  db("countries")
    .where({ id: deleted })
    .del()
    .then(gone => {
      if (!gone) {
        res.send("country does not exist");
      } else {
        res.status(402).json({ message: "success" });
      }
    })
    .catch(error => {
      res.status(501).json({ message: "Failed" });
    });
});

webRouter.put("/updatecountry/:id", (req, res) => {
  let updatedId = req.params.id;
  db("countries")
    .where({ id: updatedId })
    .update(req.body)
    .then(newlook => {
      if (newlook > 0) {
        db("countries")
          .where({ id: req.params.id })
          .then(things => {
            res.status(201).json({ message: "you have successfully uploaded" });
          });
      } else {
        res.status(403).json({ message: "failed to" });
      }
    })
    .catch(error => {
      res.status(501).json(error);
    });
});

webRouter.get("/sessions", async (req, res) => {
  try {
    let result = await db("sessions");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

webRouter.post("/addsessions", (req, res) => {
  console.log("we are trying to add a sessions");
  let post = req.body;
  addPost(post)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(({ message }) => {
      res.status(503).json({ message });
    });
});

async function addPost(post) {
  console.log("before");
  const func = await db("sessions")
    .insert(post)
    .where({ session: sessions });
  console.log("after");
  return `New Post ID: ${post.name} : Added :)`;
}

webRouter.delete("/deletesession/:id", (req, res) => {
  let deleted = req.params.id;
  db("sessions")
    .where({ id: deleted })
    .del()
    .then(gone => {
      if (!gone) {
        res.send("does not exist");
      } else {
        res.status(402).json({ message: "deleted" });
      }
    })
    .catch(error => {
      res.status(501).json({ message: "Failed." });
    });
});

// //-----------------------------------------------

webRouter.put("/updatesession/:id", (req, res) => {
  let updatedId = req.params.id;
  db("sessions")
    .where({ id: updatedId })
    .update(req.body)
    .then(newlook => {
      if (newlook > 0) {
        db("sessions")
          .where({ id: req.params.id })
          .then(things => {
            res.status(201).json({ message: "you have successfully uploaded" });
          });
      } else {
        res.status(403).json({ message: "failed to update" });
      }
    })
    .catch(error => {
      res.status(501).json(error);
    });
});

module.exports = webRouter;

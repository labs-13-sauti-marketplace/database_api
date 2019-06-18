const db = require("../data/dbConfig");
const router = require("express").Router();
const markets = require("./markets-model");
const models = require("./models");
const db = require("../data/dbConfig");

router.get("/markets", async (req, res) => {
    try {
      let result = await markets.get();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.post("/addmarket", (req, res) => {
    console.log("we are trying to add a market");
    let post = req.body;
  
    addPost(post)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(({message}) => {
        res.status(503).json({ message});
      });
  });
  
  async function addPost(post) {
    console.log("before");
    const func = await db("markets").insert(post)
    .where({ market: market });
    console.log("after");
    return `New Post ID: ${post.name} : Added :)`;
  }

  server.delete("/deletemarket/:id", (rec, rez) => {
    let deleted = rec.params.id;
  
    db("markets")
      .where({ id: deleted })
      .del()
      .then(gone => {
        if (!gone) {
          rez.send("market does not exist");
        } else {
          rez
            .status(402)
            .json({ message: "success" });
        }
      })
      .catch(errorz => {
        rez
          .status(501)
          .json({ message: "Failed" });
      });
  });
  
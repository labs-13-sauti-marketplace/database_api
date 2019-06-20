const db = require("../data/dbConfig");
const webRouter = require("express").Router();
const markets = require("./markets-model");
const models = require("./models");



webRouter.get("/markets", async (req, res) => {
    try {
      let result = await db("markets");
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });
      
  
  webRouter.post("/addmarket", (req, res) => {
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
    .where({ market: markets });
    console.log("after");
    return `New Post ID: ${post.name} : Added :)`;
  }

  webRouter.delete("/deletemarket/:id", (rec, rez) => {
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

  webRouter.put("/updatemarket/:id", (reck, rez) => {
    let updoot = reck.params.id;
  
    db("markets")
      .where({ id: updoot })
      .update(reck.body)
      .then(newlook => {
        if (newlook > 0) {
          db("markets")
            .where({ id: reck.params.id })
            .then(things => {
              rez.status(201).json({ message: "you have successfully uploaded" });
            });
        } else {
          rez.status(403).json({ message: "failed to" });
        }
      })
      .catch(error => {
        rez.status(501).json(error);
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
      .catch(({message}) => {
        res.status(503).json({ message});
      });
  });
 
  async function addPost(post) {
    console.log("before");
    const func = await db("sessions").insert(post)
    .where({ session: session });
    console.log("after");
    return `New Post ID: ${post.name} : Added :)`;
  }
webRouter.delete("/deletesession/:id",  (rec, rez) => {
  let deleted = rec.params.id;

  db("sessions")
    .where({ id: deleted })
    .del()
    .then(gone => {
      if (!gone) {
        rez.send("does not exist");
      } else {
        rez
          .status(402)
          .json({ message: "deleted" });
      }
    })
    .catch(errorz => {
      rez
        .status(501)
        .json({ message: "Failed." });
    });
});

webRouter.put("/updatesession/:id",  (reck, rez) => {
  let updoot = reck.params.id;

  db("sessions")
    .where({ id: updoot })
    .update(reck.body)
    .then(newlook => {
      if (newlook > 0) {
        db("sessions")
          .where({ id: reck.params.id })
          .then(things => {
            rez.status(201).json({ message: "you have successfully uploaded" });
          });
      } else {
        rez.status(403).json({ message: "failed to update" });
      }
    })
    .catch(error => {
      rez.status(501).json(error);
    });
});
  module.exports = webRouter;





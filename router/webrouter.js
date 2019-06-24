const db = require("../data/dbConfig");
const webRouter = require("express").Router();
const markets = require("./markets-model");
const models = require("./models");
const sessions = require("./sessions-model");

webRouter.get("/markets", async (req, res) => {
  try {
    let result = await db.get();
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
    .catch(({ message }) => {
      res.status(503).json({ message });
    });
});

async function addPost(post) {
  console.log("before");
  const func = await db("markets").insert(post)
    .where({ market: markets });
  console.log("after");
  return `New Post ID: ${post.name} : Added :)`;
}

webRouter.delete("/deletemarket/:id", (req, res) => {
  let deleted = req.params.id;
  db("markets")
    .where({ id: deleted })
    .del()
    .then(gone => {
      if (!gone) {
        res.send("market does not exist");
      } else {
        res
          .status(402)
          .json({ message: "success" });
      }
    })
    .catch(error => {
      res
        .status(501)
        .json({ message: "Failed" });
    });
});

webRouter.put("/updatemarket/:id", (req, res) => {
  let updatedId = req.params.id;
  db("markets")
    .where({ id: updatedId })
    .update(req.body)
    .then(newlook => {
      if (newlook > 0) {
        db("markets")
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
  const func = await db("sessions").insert(post)
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
        res
          .status(402)
          .json({ message: "deleted" });
      }
    })
    .catch(error => {
      res
        .status(501)
        .json({ message: "Failed." });
    });
});

//-----------------------------------------------

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





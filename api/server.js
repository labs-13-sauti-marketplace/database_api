const server = require('express')();
const helmet = require('helmet');
const bodyParser = require("body-parser");
const logger= require('morgan');

server.use(bodyParser.json());
server.use("/api/", router);

server.get("/", (req, res) => {
  res.send("server is up");
});

server.use((req, res, next) => {
  res.status(404).json({ message: 'in server route' })
})

module.exports = server;

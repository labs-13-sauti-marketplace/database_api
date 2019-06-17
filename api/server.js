const express = require('express');
const helmet = require('helmet');
const bodyParser = require("body-parser");

const server = express();
const router = require('../router/router');

server.use(express.json());
server.use(helmet());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use('*', router);

server.get('/', (req, res) => {
  res.send('server is up');
});

server.use((req, res, next) => {
  res.status(404).json({ message: 'in server route' })
})

module.exports = server;

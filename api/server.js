const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());
server.get('/', (req, res) => {
  res.send('server is up');
});

server.use((req, res, next) => {
  res.status(404).json({ message: 'in server route' })
})



module.exports = server;

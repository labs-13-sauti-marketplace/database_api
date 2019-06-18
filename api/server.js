const server = require('express')();
const helmet = require('helmet');
const bodyParser = require("body-parser");
const logger= require('morgan');
const http=require('http');
const router = require('../router/router');

server.use(logger('dev'))
server.use(helmet());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use('*', router);

setInterval(function(){
  http.get('https://sauti-marketplace.herokuapp.com/');
}, 300000);


server.get('/', (req, res) => {
  res.send('server is up');
});

server.use((req, res, next) => {
  res.status(404).json({ message: 'in server route' })
})

module.exports = server;

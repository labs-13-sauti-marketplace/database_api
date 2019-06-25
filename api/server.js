const server = require('express')();
const helmet = require('helmet');
const bodyParser = require("body-parser");
const logger = require('morgan');
const router = require('../router/ussdRouter');
const webRouter = require('../router/webrouter');

server.use(logger('dev'))
server.use(helmet());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use('/api', webRouter);
server.use('*', router);

server.get('/', (req, res) => {
  res.send('server is up');
});

server.use((req, res, next) => {
  res.status(404).json({ message: 'in server route' })
})

module.exports = server;
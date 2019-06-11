const express  = require('express');
const helmet = require('helmet');
const db = require('../data/dbConfig')
const server = express();

server.use(express.json());
server.use(helmet());
server.get('/', (req, res) => {
  res.send('server is up');
});
server.post('*', async (req, res) => {
  let { sessionId, serviceCode, phoneNumber, text } = req.body;
  let response = '';
  switch (text) {
    case '':
      let sql = `SELECT name FROM countries`;
      try {
        const names = await db.raw(sql);
        response = `END countries ${names[0].name}`
      }catch(err){
        console.log(err)
      }
      break;
    default:
      response = 'bad request';    
  } 
})
server.use((req, res, next) => {
  res.status(404).json({message:'in server route'})
})

module.exports = server;

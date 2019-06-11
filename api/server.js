const server  = require('express')();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('../data/dbConfig')

server.use(bodyParser.json());
server.use(helmet());
server.get('*', (req, res) => {
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
        console.log(names)
        response = names[0].name
      }catch(err){
        console.log(err)
      }
      break;
    default:
      response = 'bad request';    
  } 
  res.send(response)
})
server.use((req, res, next) => {
  res.status(404).json({message:'in server route'})
})

module.exports = server;

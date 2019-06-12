const server  = require('express')();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const Session = require('modem').Ussd_Session;

const db = require('../data/dbConfig')

server.use(bodyParser.json());
server.use(helmet());
server.get('/', async (req, res) => {
  db('countries')
  .then(countries => {
    res.status(200).json(countries)
  }).catch(err => {res.status(400).json(err)})
});

const CheckBalance = function(c) {
  let session = new Session;
  session.callback = c;

  session.parseResponse = function(response_code, message) {
      this.close();
      let match = message.match(/([0-9,\,]+)\sRial/);
      if(!match) {
          if(this.callback)
              this.callback(false);
          return ;
      }
      if(this.callback)
          this.callback(match[1]);
      session.modem.credit = match[1];
  }

  session.execute = function() {
      this.query('*141*#', session.parseResponse);
  }

  return session;
}





server.post('*', async (req, res) => {
  let { sessionId, serviceCode, phoneNumber, text } = req.body;
  let response = '';
  switch (text) {
    case '':
      response = `CON select country`
      console.log('text', text);
    case '1':
      let sql = `SELECT name FROM countries`;
      try {
        const countries = await db.raw(sql);
        // console.log(countries)
        let newArray = [];
        countries.rows.forEach(country => newArray.push(country.name))
        response = newArray.toString();
      }catch(err){
        console.log('err', err) 
        response = res.json(err)
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

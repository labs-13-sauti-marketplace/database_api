// The menu.sessionConfig(config) method is used to define your session handler. It accepts an object with the implementations of the following methods:

// start [function(sessionId, callback)]: used to initialize a new session, invoked internally by the menu.run() method before any state is called.
// end [function(sessionId, callback)]: used to delete current session, invoked internally by the menu.end() method.
// set [function(sessionId, key, value, callback)]: used to store a key-value pair in the current session, invoked internally by menu.session.set().
// get [function(sessionId, key, callback)]: used to retrieve a value from the current session by key, invoked internally by menu.session.get().

// using promises
menu.sessionConfig({
  ...
  get: function(sessionId, key){
      return new Promise((resolve, reject) => {
          let value = sessions[sessionId][key];
          resolve(value);
      });
  }
})

// use the 'menu.session' object to add and retrieve data inside states
menu.state('someState', {
  run: () => {
      let firstName = menu.val;
      menu.session.set('firstName', firstName)
      .then( () => {
          menu.con('Enter your last name');
      })
  }

})

menu.state('otherState', {
  run: () => {
      menu.session.get('firstName')
      .then( firstName => {
          // do something with the value
          console.log(firstName);
      
          menu.con('Next');
      })
  }
})



// // installed 'yarn add modem' to instantiate
// const modem = require("modem").Modem();

// // instantiates the USSD session
// const Session = require("modem").Ussd_Session;

// // create a session
// var CheckBalance = function(c) {
//   var session = new Session();
//   session.callback = c;

//   session.parseResponse = function(response_code, message) {
//     this.close();

//     var match = message.match(/([0-9,\,]+)\sRial/);
//     if (!match) {
//       if (this.callback) this.callback(false);
//       return;
//     }

//     if (this.callback) this.callback(match[1]);

//     session.modem.credit = match[1];
//   };

//   session.execute = function() {
//     this.query("*141*#", session.parseResponse);
//   };

//   return session;
// };

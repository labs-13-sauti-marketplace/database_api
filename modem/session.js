// installed 'yarn add modem' to instantiate
const modem = require("modem").Modem();

// instantiates the USSD session
const Session = require("modem").Ussd_Session;

// create a session
var CheckBalance = function(c) {
  var session = new Session();
  session.callback = c;

  session.parseResponse = function(response_code, message) {
    this.close();

    var match = message.match(/([0-9,\,]+)\sRial/);
    if (!match) {
      if (this.callback) this.callback(false);
      return;
    }

    if (this.callback) this.callback(match[1]);

    session.modem.credit = match[1];
  };

  session.execute = function() {
    this.query("*141*#", session.parseResponse);
  };

  return session;
};

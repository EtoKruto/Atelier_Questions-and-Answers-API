var models = require('../models/index.js');
require("dotenv").config();


module.exports = {
  // Updates a question to show it was found helpful
  updateHelpful: function (req, res) {
    var args = [req.body.username, req.body.text, req.body.roomname];
    models.messages.create(args, (err) => {
      if (err) {
        console.log('error in controller, post message', err);
        res.sendStatus(401);
      } else {
        res.sendStatus(280);
      }
    });
  },
  //Updates an answer to show it has been reported. Note, this action does not delete the answer, but the answer will not be returned in the above GET request.
  updateReport: function (req, res) {
    var args = [req.body.username, req.body.text, req.body.roomname];
    models.messages.create(args, (err) => {
      if (err) {
        console.log('error in controller, post message', err);
        res.sendStatus(401);
      } else {
        res.sendStatus(280);
      }
    });
  },
};
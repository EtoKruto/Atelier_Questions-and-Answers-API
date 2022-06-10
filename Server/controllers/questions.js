// var models = require('../models/index.js');
var { pool } = require('../db/index.js');

require("dotenv").config();

module.exports = {
  // Retrieves a list of questions for a particular product. This list does not include any reported questions.
  getQuestions: async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const { err, rows } = await pool.query('SELECT * FROM questions WHERE id = 3')
    if (err) {
      console.log('err.stack', err)
    } else {
      console.log('rows', rows)
      console.log('res.rows[0]', rows[0])
      res.send(rows[0])
    }
    // const { rows } = await db.query('SELECT * FROM questions WHERE id = 1', [id])

    // pool.query('SELECT * FROM questions WHERE id = 1', (err, res) => {

    // })

    // pool.query('SELECT * FROM questions WHERE id = 2')
    // .then((res)=> {
    //   console.log('user:', res.rows[0]);
    //   // console.log('res.status', res.status(200))
    //   res.status(200);
    //   // res.send(res.rows[0]);
    //   // return res.json(res.rows)

    // })
    // .catch(err =>
    //   setImmediate(() => {
    //     throw err
    //   })
    //   )


  },

  // Returns answers for a given question. This list does not include any reported answers.
  getAnswers: (req, res)=> {
    // models.questions.getAll()
    //   (err, data) => {
    //   if (err) {
    //     console.log('error inside MESSAGES GET CONTROLLER', err);
    //     res.sendStatus(404);
    //   } else {
    //     res.status(200).send(data);
    //   }
    // });
  },
  // Updates a question to show it was found helpful
  updateHelpful: function (req, res) {
    var args = [req.body.username, req.body.text, req.body.roomname];
    models.questions.create(args, (err) => {
      if (err) {
        console.log('error in controller, post message', err);
        res.sendStatus(401);
      } else {
        res.sendStatus(280);
      }
    });
  },
  // Updates a question to show it was reported. Note, this action does not delete the question, but the question will not be returned in the above GET request.
  updateReport: function (req, res) {
    var args = [req.body.username, req.body.text, req.body.roomname];
    models.questions.create(args, (err) => {
      if (err) {
        console.log('error in controller, post message', err);
        res.sendStatus(401);
      } else {
        res.sendStatus(280);
      }
    });
  },
  //Adds a question for the given product
  addQuestion: function (req, res) {
    var args = [req.body.username, req.body.text, req.body.roomname];
    models.questions.create(args, (err) => {
      if (err) {
        console.log('error in controller, post message', err);
        res.sendStatus(401);
      } else {
        res.sendStatus(280);
      }
    });
  },
  // Adds an answer for the given question
  addAnswer: function (req, res) {
    var args = [req.body.username, req.body.text, req.body.roomname];
    models.questions.create(args, (err) => {
      if (err) {
        console.log('error in controller, post message', err);
        res.sendStatus(401);
      } else {
        res.sendStatus(280);
      }
    });
  }
};
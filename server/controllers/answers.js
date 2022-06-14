// var models = require('../models/index.js');
var { pool } = require('../db/index.js');

require("dotenv").config();


module.exports = {
  // Updates a question to show it was found helpful
  updateHelpful: async function (req, res) {
    try {
      const { answer_id } = req.params;
      let queryStringSelect = 'SELECT * FROM answers WHERE id = $1'
      const helpfulAByID = await pool.query(queryStringSelect,
        [answer_id])
        if (helpfulAByID.err) {
          console.log('err.stack', helpfulAByID.err)
        } else {
          helpfulAByID.rows[0].helpful+=1
          const queryArgs =  [helpfulAByID.rows[0].helpful, answer_id];
          let queryStringUpdate = 'UPDATE answers SET helpful = $1 WHERE id = $2'
          const confirmed = await pool.query(queryStringUpdate,queryArgs)
          if (confirmed.err) {
            console.log('err.stack', confirmed.err)
          } else {
            res.sendStatus(204)
          }
        }
      } catch (error) {
        res.sendStatus(404)
      }
    },
    //Updates an answer to show it has been reported. Note, this action does not delete the answer, but the answer will not be returned in the above GET request.
    updateReport: async function (req, res) {
      console.log('get answers - req.query', req.query)
      console.log('get answers - req.params', req.params)
      console.log('get answers - req.body', req.body)
      try {
        const { answer_id } = req.params;
        const queryArgs =  [answer_id];
        let queryStringUpdate = 'UPDATE answers SET reported = TRUE WHERE id = $1'
        const confirmed = await pool.query(queryStringUpdate,queryArgs)
        if (confirmed.err) {
          console.log('err.stack', confirmed.err)
        } else {
          console.log(confirmed);
          res.sendStatus(204)
        }
      } catch (error) {
        res.sendStatus(404)
      }
    }
  };
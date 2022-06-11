// var models = require('../models/index.js');
var { pool } = require('../db/index.js');

require("dotenv").config();

module.exports = {
  // Retrieves a list of questions for a particular product. This list does not include any reported questions.
  getQuestions: async (req, res) => {
    // console.log('get answers - req.query', req.query)
    // console.log('get answers - req.params', req.params)
    // console.log('req.params.question_id', req.params.question_id)
    const { id, page = 1, count = 5 } = req.query;
    // const id = req.query.question_id;
    console.log('id', id);
    console.log('page', page);
    console.log('count', count);
    const allQIDs = await pool.query(
      `SELECT
      questions.id AS question_id,
      questions.body AS question_body,
      questions.date_written AS question_date,
      questions.asker_name AS asker_name,
      questions.asker_email AS asker_email,
      questions.helpful AS question_helpfulness,
      questions.reported AS reported

      FROM questions
      LEFT JOIN answers ON answers.question_id = questions.id
      WHERE (product_id = $1)
      GROUP BY questions.id
      OFFSET $2
      LIMIT $3
      `,
      [id, page, count])
      if (allQIDs.err) {
        console.log('err.stack', allQIDs.err)
      } else {
        // console.log('allQIDs.rows', allQIDs.rows)
      }
      // let getUserPormises = [];
      // for (const question of allQIDs.rows) {
      //   getUserPormises.push(
      //     pool.query(
      //       'SELECT *\
      //       FROM answers\
      //       WHERE (question_id = $1 AND reported = FALSE)',
      //       [question.id])
      //       )
      //     }
      // console.log('allQIDs', allQIDs)

      let questionList = {
        product_id: id,
        page: page,
        count: count,
        results: allQIDs.rows
      }
      console.log('questionList', questionList)

      res.send(questionList)
    },

    // Returns answers for a given question. This list does not include any reported answers.
    getAnswers: async (req, res) => {
      // console.log('get answers - req.query', req.query)
      // console.log('get answers - req.params', req.params)
      // console.log('req.params.question_id', req.params.question_id)
      const { page = 1, count = 5 } = req.query;
      const id = req.params.question_id;
      // console.log('id', id);
      // console.log('page', page);
      // console.log('count', count);
      const allAnswers = await pool.query(
        `SELECT
        answers.id as answer_id,
        body,
        date_written as date,
        answerer_name,
        answerer_email,
        helpful as helpfulness,

        COALESCE(
          ARRAY_AGG(
            CASE
            WHEN photos.id is not null
            THEN JSON_BUILD_OBJECT(
        'id', (photos.id),
        'url', (photos.url)
        )
        END
        )

        FILTER (WHERE photos.id is not null), '{}') AS photos
        FROM answers
        LEFT JOIN photos ON answers.id = photos.answer_id
        WHERE (answers.question_id = $1 AND reported = FALSE)
        GROUP BY answers.id
        OFFSET $2
        LIMIT $3
        `,
        [id, page, count])
        if (allAnswers.err) {
          console.log('err.stack', allAnswers.err)
        } else {
          console.log('allAnswers.rows', allAnswers.rows)
        }

        const answersList = {
          question: id,
          page: page,
          count: count,
          results: allAnswers.rows
        }
        res.send(answersList)
      },

      // Updates a question to show it was found helpful
      updateHelpful: async function (req, res) {
        try {
          const { question_id } = req.body;
          let queryStringSelect = 'SELECT * FROM questions WHERE id = $1'
          const helpfulQByID = await pool.query(queryStringSelect,
            [question_id])
            if (helpfulQByID.err) {
              console.log('err.stack', helpfulQByID.err)
            } else {
              helpfulQByID.rows[0].helpful+=1
              const queryArgs =  [helpfulQByID.rows[0].helpful, question_id];
              let queryStringUpdate = 'UPDATE questions SET helpful = $1 WHERE id = $2'
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

        // Updates a question to show it was reported. Note, this action does not delete the question, but the question will not be returned in the above GET request.
        updateReport: async function (req, res) {
          try {
          const { question_id } = req.body;
              const queryArgs =  [question_id];
              let queryStringUpdate = 'UPDATE questions SET reported = TRUE WHERE id = $1'
              const confirmed = await pool.query(queryStringUpdate,queryArgs)
              if (confirmed.err) {
                console.log('err.stack', confirmed.err)
              } else {
                res.sendStatus(204)
            }
          } catch (error) {
            res.sendStatus(404)
          }
        },

        //Adds a question for the given product
        addQuestion: async function (req, res) {

          try {
            const { body, name, email, product_id} = req.body;
            const queryArgs =  [body, name, email, product_id];
                let queryStringAdd =
                `INSERT INTO questions(body, asker_name, asker_email, product_id)
                VALUES ($1, $2, $3, $4)`
                const confirmed = await pool.query(queryStringAdd, queryArgs)
                if (confirmed.err) {
                  console.log('err.stack', confirmed.err)
                } else {
                  res.sendStatus(201)
              }
            } catch (error) {
              res.sendStatus(404)
            }
        },
        // Adds an answer for the given question
        addAnswer: async function (req, res) {
          // console.log('get answers - req.query', req.query)
          // console.log('get answers - req.params', req.params)
          // console.log('get answers - req.body', req.body)
          try {
            const {question_id} = req.params;
            const { body, name, email, photos} = req.body;
            const queryArgs =  [body, name, email, question_id];
                let queryStringAdd =
                `INSERT INTO answers(body, answerer_name, answerer_email, question_id)
                VALUES ($1, $2, $3, $4)
                RETURNING *`
                const confirmed = await pool.query(queryStringAdd, queryArgs)
                if (confirmed.err) {
                  console.log('err.stack', confirmed.err)
                } else {
                  res.sendStatus(201)
              }
            } catch (error) {
              res.sendStatus(404)
            }
      }
    };
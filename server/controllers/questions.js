var { pool } = require('../db/index.js');

module.exports = {
  // Retrieves a list of questions for a particular product. This list does not include any reported questions.
  getQuestions: async (req, res) => {
    try {
    const { id, page = 0, count = 5 } = req.query;
    const allQIDs = await pool.query(
      `SELECT questions.product_id,
      (
        SELECT JSON_AGG(
          JSON_BUILD_OBJECT(
            'question_id',questions.id,
            'question_body', questions.body,
            'question_date', questions.date_written,
            'asker_name', questions.asker_name,
            'asker_email', questions.asker_email,
            'question_helpfulness', questions.helpful,
            'reported', questions.reported,

            'answers', (
              SELECT
                COALESCE(
                  JSON_OBJECT_AGG(
                    answers.id, (
                      SELECT
                        JSON_BUILD_OBJECT(
                          'id', answers.id,
                          'body', answers.body,
                          'date', answers.date_written,
                          'answerer_name', answers.answerer_name,
                          'answerer_email', answers.answerer_email,
                          'helpfulness', answers.helpful,
                          'photos', (
                            SELECT COALESCE(JSON_AGG(ROW_TO_JSON(photo)),'[]')
                            FROM (
                              SELECT id, url
                              FROM photos
                              WHERE photos.answer_id = answers.id
                            ) AS photo
                          )
                        )
                    )
                  ),'{}')
                FROM (
                  SELECT *
                  FROM answers
                  WHERE answers.question_id = question_id
                  ORDER BY helpful
                  LIMIT 2
                ) AS answers
            )
          )
        )
      ) AS results
      FROM questions
      WHERE questions.product_id = $1
      GROUP BY questions.product_id
      OFFSET $2
      LIMIT $3
      `,
      [id, page, count])
      if (allQIDs.err) {
        throw ('err.stack', allQIDs.err)
      } else {
      res.status(200).send(allQIDs.rows[0])
      }
    } catch (error) {
      res.sendStatus(404)
    }
    },

    // Returns answers for a given question. This list does not include any reported answers.
    getAnswers: async (req, res) => {
      try {
      const { page = 0, count = 5 } = req.query;
      const id = req.params.question_id;
      const allAnswers = await pool.query(
        `SELECT
        answers.id as answer_id,
        body,
        to_char(to_timestamp(date_written / 1000), 'yyyy-MM-dd"T"00:00:00.000Z') as date,
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
          throw ('err.stack', allAnswers.err)
        } else {
        const answersList = {
          question: id,
          page: page,
          count: count,
          results: allAnswers.rows
        }
        res.status(200).send(answersList)
      }
    } catch (error) {
      res.sendStatus(404)
    }
      },

      // Updates a question to show it was found helpful
      updateHelpful: async function (req, res) {
        try {
          const { question_id } = req.body;
          let queryStringSelect = 'SELECT * FROM questions WHERE id = $1'
          const helpfulQByID = await pool.query(queryStringSelect,
            [question_id])
            if (helpfulQByID.err) {
              throw ('err.stack', helpfulQByID.err)
            } else {
              helpfulQByID.rows[0].helpful+=1
              const queryArgs =  [helpfulQByID.rows[0].helpful, question_id];
              let queryStringUpdate = 'UPDATE questions SET helpful = $1 WHERE id = $2'
              const confirmed = await pool.query(queryStringUpdate,queryArgs)
              if (confirmed.err) {
                throw ('err.stack', confirmed.err)
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
                throw ('err.stack', confirmed.err)
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
                const queryStringAdd =
                `INSERT INTO questions(body, asker_name, asker_email, product_id)
                VALUES ($1, $2, $3, $4)`
                const confirmed = await pool.query(queryStringAdd, queryArgs)
                if (confirmed.err) {
                  throw ('err.stack', confirmed.err)
                } else {
                  res.sendStatus(201)
              }
            } catch (error) {
              res.sendStatus(404)
            }
        },

        // Adds an answer for the given question
        addAnswer: async function (req, res) {
          try {
            const {question_id} = req.params;
            const { body, name, email, photos} = req.body;
            const queryArgs =  [body, name, email, question_id];
                let queryStringAdd =
                `INSERT INTO answers(body, answerer_name, answerer_email, question_id)
                VALUES ($1, $2, $3, $4)
                RETURNING id`
                const confirmed = await pool.query(queryStringAdd, queryArgs)
                // console.log(confirmed.rows[0].id)
                if (confirmed.err) {
                  throw ('err.stack', confirmed.err)
                } else {
                  res.sendStatus(201)
              }
            } catch (error) {
              res.sendStatus(404)
            }
      }
    };




    // not using
    // var models = require('../models/index.js');
      // console.log ('req.body', req.body)
      // console.log ('req.params', req.params)
      // console.log ('req.query', req.query)
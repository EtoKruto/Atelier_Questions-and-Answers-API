var db = require('../db/index.js');

module.exports = {
  // getAll: function (callback) {
  //     client.query('SELECT * FROM questions WHERE id = $1', [1], (err, res) => {
  //       done()
  //       if (err) {
  //         console.log(err.stack)
  //       } else {
  //         console.log(res.rows[0])
  //         callback(res.rows[0])
  //       }
  //     })

  // }
  getAll: (req, res) => {
    db.pool.query('SELECT * FROM questions WHERE id = 2')
    .then((data) => {
      console. log('data in models', data.rows)
      .catch((err) => {
        console.log('error in models', err)
      })
    })

  }
};
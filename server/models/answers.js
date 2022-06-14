var pool = require('../db/index.js');

module.exports = {
  getAll: function (callback) {
    pool.connect((err, client, done) => {
      if (err) throw err
      pool.query('SELECT * FROM questions WHERE id = 3', [2], (res) => {
        if (!res) {
          throw err
        }
        console.log('user:', res.rows[0])
        callback(res)
      })
    })
  }
};


// if (err) {
//   console.log('err', err)
//   console.log('err.stack', err.stack)
//   callback(err, null)
// } else {
//   console.log('res', res)
//   console.log('res.rows[0]', res.rows[0])
//   callback(null, res.rows[0])

// }
const express = require('express');
var db = require('./db/index.js');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './../file.env') })
// const path = require('path');
// const bodyParser = require('body-parser');
// const router = require('./routes.js');

// Middleware
// var morgan = require('morgan');
// var cors = require('cors');

// Router
var router = require('./routes.js');

const app = express();
const port = process.env.S_PORT;

// Logging and parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router
// app.use(router);
app.use('/', router);


// Set up what we are listening on
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

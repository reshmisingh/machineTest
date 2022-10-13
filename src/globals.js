
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const promiseRouter = require('express-promise-router');
const router = promiseRouter();
const cors = require('cors');
var fs = require('fs');
const http = require('http');


const app = express()
  .use(bodyParser.json())
  .use(morgan('dev'))
  .use(router)
  .use(cors({
    credentials: true,
    origin: (origin, callback) => callback(null, true),
  }))

app.use(express.static('public'));
//var server = http.createServer(app);
//var io = require('socket.io')(server);

module.exports = {
  app
};

require('./src/constant/global_constants');
require('./src/global_functions');

const { app } = require('./src/globals');
const Knex = require('knex'); 
const knexConfig = require('./db/knex'); 
const v1 = require('./src/routes/index');
const { Model } = require('objection');

// Initialize knex.
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);

Model.knex(knex);

  
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  const allowedOrigins = ['http://localhost:4200'];
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, authToken');

  next();
});

app.use('/api', v1);

app.use('/', (req, res) => {
  res.statusCode = 404; //send the appropriate status code
  res.json({
    status: false,
    message: 'Not Found',
    code: 404
  });
});

//error handler
app.use((err, req, res, next) => {
  if (err) {
    res.status(err.statusCode || err.status || 500).send(err || {});
  } else {
    next();
  }
});

server = app.listen(3000, function () {
  console.log(' Server listening on *:', server.address().port);
});
const development = require('./../config/index.js').development;
module.exports = {

  development: {
    client: 'pg',
    useNullAsDefault: true,
    migrations: {
      directory: './../src/migrations'
    },
    connection: {
      host: development.host,
      user: development.username,
      password: development.password,
      database: development.database
    }
  },
};


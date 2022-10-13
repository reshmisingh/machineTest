require('dotenv').config();
require('./../src/constant/global_constants').CONFIG;
 

CONFIG.db_host      = process.env.DB_HOST       || 'localhost'; 
CONFIG.db_name      = process.env.DB_NAME       || 'machine-test';
CONFIG.db_user      = process.env.DB_USER       || 'postgres';
CONFIG.db_password  = process.env.DB_PASSWORD   || 'event';

//const sendgrid = '';

module.exports = {
    development: {
        username: CONFIG.db_user,
        password: CONFIG.db_password,
        database: CONFIG.db_name,
        host: CONFIG.db_host,
    },
    //sendgrid: sendgrid
}

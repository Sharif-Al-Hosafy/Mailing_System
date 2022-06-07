const mysql = require('mysql2');
const util = require('util');
var connection = mysql.createConnection({
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER_NM,
  // port: process.env.DB_PORT,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB,
  host: process.env.DB_HOST,
  user: process.env.DB_USER_NM,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});
// promise wrapper to enable async await with MYSQL
connection.query = util.promisify(connection.query).bind(connection);

// connect to the database
connection.connect(function (err) {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('Database connection started');
});

module.exports = connection;

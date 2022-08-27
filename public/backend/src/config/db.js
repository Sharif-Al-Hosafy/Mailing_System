const mysql = require('mysql2');
const util = require('util');
var connection = mysql.createPool({
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER_NM,
  // port: process.env.DB_PORT,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB,
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: 'root@1234',
  database: 'archieve',
});
// promise wrapper to enable async await with MYSQL
connection.query = util.promisify(connection.query).bind(connection);

// connect to the database
connection.getConnection(function (err) {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log(' Archieve Database connection started');
});

module.exports = connection;

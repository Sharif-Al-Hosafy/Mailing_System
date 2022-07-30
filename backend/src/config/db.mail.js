const mysql = require("mysql2");
const util = require("util");
var mail_connection = mysql.createConnection({
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER_NM,
  // port: process.env.DB_PORT,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB,
  host: process.env.DB_HOST,
  user: process.env.DB_USER_NM,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_MAIL,
});
// promise wrapper to enable async await with MYSQL
mail_connection.query = util
  .promisify(mail_connection.query)
  .bind(mail_connection);

// connect to the database
mail_connection.connect(function (err) {
  if (err) {
    console.log("error connecting: " + err.stack);
    return;
  }
  console.log(" Mail Database connection started");
});

module.exports = mail_connection;

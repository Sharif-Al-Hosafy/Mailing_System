const mysql = require('mysql')
const util = require('util')
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER_NM,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
})
// promise wrapper to enable async await with MYSQL
connection.query = util.promisify(connection.query).bind(connection)

// connect to the database
connection.connect(async function (err) {
  if (err) {
    console.log('error connecting: ' + err.stack)
    return
  }
  console.log('Database connection started')
})

module.exports = connection

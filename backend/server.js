require('dotenv').config() // enviroment vars
const express = require('express')
const app = express()

// importing routes
const usersRoutes = require('./src/entities/users/user.route')

// app middlewares
app.use(express.json())

// database connection
const db = require('./src/config/db')

// app routes
app.use('/api/v1/users', usersRoutes)

// starting server
app.listen(process.env.port || 5000, (req, res) => {
  console.log('Web Server is listening at port ' + (process.env.port || 5000))
})

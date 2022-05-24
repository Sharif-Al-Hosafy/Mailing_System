const express = require('express')
const app = express()
const router = express.Router()

require('dotenv').config()

require('./config/db') // database connection

router.get('/', (req, res) => {
  res.status(200).json('Sucess')
})

app.listen(process.env.port || 5000, (req, res) => {
  console.log('Web Server is listening at port ' + (process.env.port || 5000))
})

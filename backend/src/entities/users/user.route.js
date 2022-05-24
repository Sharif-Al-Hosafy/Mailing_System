const router = require('express').Router()
const db = require('../../config/db') // database connection

router.post('/', async (req, res) => {
  let queryString = `insert into users (name,password) values('${req.body.username}', '${req.body.password}')`
  const user = await db.query(queryString).catch((err) => {
    throw err
  })
  res.json(user)
})

module.exports = router

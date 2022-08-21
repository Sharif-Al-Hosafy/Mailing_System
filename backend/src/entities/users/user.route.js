const router = require('express').Router()
const {
  login,
  insertUser,
  getAllDep,
  getAllUser,
  showLogs,
  addLog,
} = require('./user.controller')
const authMiddleware = require('../../utils/authMiddleware')

router.route('/dep').get(getAllDep)
router.route('/login').post(login)
router.route('/add').post(insertUser)
router.route('/users').get(getAllUser)
router.route('/admin/monitor').post(addLog).get(showLogs)

module.exports = router

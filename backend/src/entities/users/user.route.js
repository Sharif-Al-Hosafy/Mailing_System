const router = require('express').Router()
const { login, getUser, getdata } = require('./user.controller')
const authMiddleware = require('../../utils/authMiddleware')

router.route('/login').post(login)

router.route('/').get(getUser)

module.exports = router

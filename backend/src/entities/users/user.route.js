const router = require('express').Router();
const { login } = require('./user.controller');
const authMiddleware = require('../../utils/authMiddleware');

router.route('/login').post(login);

module.exports = router;

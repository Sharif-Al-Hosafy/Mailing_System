const router = require('express').Router();
const { login, insertUser } = require('./user.controller');
const authMiddleware = require('../../utils/authMiddleware');

router.route('/login').post(login);
router.route('/add').post(insertUser);

module.exports = router;

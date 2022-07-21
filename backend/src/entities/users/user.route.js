const router = require('express').Router();
const { login, getUser, getdata } = require('./user.controller');
const authMiddleware = require('../../utils/authMiddleware');

router.route('/login').post(login);

router.route('/').get(getUser);
router.route('/data').get(getdata);

module.exports = router;

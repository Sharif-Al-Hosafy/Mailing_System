const router = require('express').Router();
const { login, insertUser, getAllDep } = require('./user.controller');
const authMiddleware = require('../../utils/authMiddleware');

router.route('/dep').get(getAllDep);
router.route('/login').post(login);
router.route('/add').post(insertUser);

module.exports = router;

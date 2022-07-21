const jwt = require('jsonwebtoken');
const err = require('../../utils/createError');
const db = require('../../config/db'); // database connection

const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) throw err(400, 'Username or password not found');

  const id = new Date().getDate(); // just for example

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.status(200).json({ message: 'success', token });
};

const getUser = async (req, res) => {
  let queryString = `select * from users`;
  const user = await db.query(queryString).catch((err) => {
    throw err;
  });
  res.json(user);
};

const getdata = async (req, res) => {
  let queryString = `select orgname,importid,summary,importdate from importdata where importid = 1000 ORDER BY importdate DESC;`;
  const user = await db.query(queryString).catch((err) => {
    throw err;
  });
  res.json(user);
};

module.exports = {
  login,
  getUser,
  getdata,
};

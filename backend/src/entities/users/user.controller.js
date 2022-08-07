const jwt = require('jsonwebtoken');
const err = require('../../utils/createError');
const db = require('../../config/db'); // database connection
const bcrypt = require('bcrypt');

const insertUser = async (req, res) => {
  const { username, password, dep_id } = req.body;
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(password, salt);
  let queryString = `insert into mail_system.users (username,pass,dep_id) values ('${username}','${hash}',${dep_id})`;
  const user = await db.query(queryString).catch((err) => {
    throw err;
  });
  res.status(200).json({ message: 'success' });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) throw err(400, 'Username or password not found');
  let queryString = `select id,username,pass from mail_system.users where username='${username}'`;
  const user = await db.query(queryString).catch((err) => {
    throw err;
  });

  if (user.length == 0) throw err(404, 'Username not Found');
  const isMatch = await bcrypt.compare(password, user[0].pass);

  if (!isMatch) throw err(400, 'da5al el pass 3edel ya fashel yabnel 3ars');
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.status(200).json({ token });
};

module.exports = {
  login,
  insertUser,
};

const jwt = require('jsonwebtoken');
const err = require('../../utils/createError');
const db = require('../../config/db');
const bcrypt = require('bcrypt');

const getAllDep = async (req, res) => {
  let queryString = `select dep_name from mail_system.departments`;
  const departments = await db.query(queryString).catch((err) => {
    throw err;
  });

  res.status(200).json(departments);
};

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

const login = async (req, res) => {
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

  let query = `SELECT mail_system.users.username,mail_system.departments.dep_name 
                from mail_system.users
                join mail_system.departments
                on users.dep_id = departments.id
                where users.username = "${username}" `;
  const userData = await db.query(query).catch((err) => {
    throw err;
  });

  res
    .status(200)
    .json({ token: token, name: username, department: userData[0].dep_name });
};

module.exports = {
  login,
  insertUser,
  getAllDep,
};

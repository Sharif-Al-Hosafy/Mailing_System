const jwt = require('jsonwebtoken')
const err = require('../../utils/createError')
const db = require('../../config/db')
const bcrypt = require('bcrypt')

const getAllDep = async (req, res) => {
  let queryString = `select dep_name from mail_system.departments`
  const departments = await db.query(queryString).catch((err) => {
    throw err
  })

  res.status(200).json(departments)
}

const getAllUser = async (req, res) => {
  let queryString = `select username from mail_system.users u join mail_system.departments d on u.dep_id = d.id where d.dep_name = "${req.params.dep_name}";`
  const users = await db.query(queryString).catch((err) => {
    throw err
  })

  res.status(200).json(users)
}

const insertUser = async (req, res) => {
  const { username, password, dep_id } = req.body
  const salt = await bcrypt.genSaltSync(10)
  const hash = await bcrypt.hashSync(password, salt)
  let queryString = `insert into mail_system.users (username,pass,dep_id) values ('${username}','${hash}',${dep_id})`
  const user = await db.query(queryString).catch((err) => {
    throw err
  })
  res.status(200).json({ message: 'success' })
}

const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) throw err(400, 'Username or password not found')
  let queryString = `select id,username,pass from mail_system.users where username='${username}'`
  const user = await db.query(queryString).catch((err) => {
    throw err
  })

  if (user.length == 0) throw err(404, 'Username not Found')
  const isMatch = await bcrypt.compare(password, user[0].pass)

  if (!isMatch) throw err(400, 'Incorrect Password')
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  let query = `SELECT mail_system.users.username,mail_system.users.dep_id,mail_system.departments.dep_name 
                from mail_system.users
                join mail_system.departments
                on users.dep_id = departments.id
                where users.username = "${username}" `
  const userData = await db.query(query).catch((err) => {
    throw err
  })

  res.status(200).json({
    token: token,
    name: username,
    dep_id: userData[0].dep_id,
    department: userData[0].dep_name,
  })
}

const addLog = async (req, res) => {
  let query = `insert into mail_system.logs (username, action,time,date,file_name) values ("${req.body.username}", "${req.body.action}", CURRENT_TIME(),CURRENT_DATE(),"${req.body.file_name}");`
  const logs = await db.query(query).catch((err) => {
    throw err
  })
  res.status(201).json({ message: 'success' })
}

const showLogs = async (req, res) => {
  let query = `SELECT username, action,time_format(time,"%r")as time,date,file_name FROM mail_system.logs order by id desc;`
  const logs = await db.query(query).catch((err) => {
    throw err
  })
  res.status(201).json(logs)
}

module.exports = {
  login,
  insertUser,
  getAllDep,
  getAllUser,
  showLogs,
  addLog,
}

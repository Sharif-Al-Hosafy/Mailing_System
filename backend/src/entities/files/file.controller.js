const jwt = require('jsonwebtoken')
const err = require('../../utils/createError')
const db = require('../../config/db') // database archieve

const fileList = async (req, res) => {
  let queryString = `select id,orgname,importid,summary,importdate from importdata where importid = ${req.params.id} ORDER BY importdate DESC;`
  const file = await db.query(queryString).catch((err) => {
    throw err
  })
  res.status(200).json(file)
}

const fileToDailyScreen = async (req, res) => {
  let queryString = `insert into mail_system.file (file_no, file_data, orgname, summary) 
  select imd.id,imf.pdffile,imd.orgname,imd.summary from archieve.importdata imd
  join archieve.importfile imf 
  on imd.id = imf.id
  where imd.id = '${req.params.fileId}';`
  const file = await db.query(queryString).catch((err) => {
    throw err
  })
  res.status(200).json(file)
}

const openFile = async (req, res) => {
  let queryString = `select file_data from mail_system.file where file.no '${req.params.fileId}';`
  const file = await db.query(queryString).catch((err) => {
    throw err
  })
  res.status(200).json(file)
}

const showDailyDocuments = async (req, res) => {
  let queryString = `select * from mail_system.file`
  const files = await db.query(queryString).catch((err) => {
    throw err
  })
  res.status(200).json(files)
}

module.exports = {
  fileToDailyScreen,
  fileList,
  openFile,
  showDailyDocuments,
}

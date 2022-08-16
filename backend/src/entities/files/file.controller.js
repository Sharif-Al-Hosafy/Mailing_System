const jwt = require('jsonwebtoken')
const err = require('../../utils/createError')
const db = require('../../config/db.mail') // database archieve
const { Buffer } = require('buffer')
const fs = require('fs')
let staticID

const fileListImp = async (req, res) => {
  let queryString = `select id,orgname,importid,summary,importdate from archieve.importdata where importid = ${req.params.id} ORDER BY importdate DESC;`
  const file = await db.query(queryString).catch((err) => {
    throw err
  })
  res.status(200).json(file)
}

const fileListExp = async (req, res) => {
  let queryString = `select id,orgname,exportid,summary,exportdate from archieve.exportdata where exportid = ${req.params.id} ORDER BY exportdate DESC;`
  const file = await db.query(queryString).catch((err) => {
    throw err
  })
  res.status(200).json(file)
}

const fileToDailyScreenImp = async (req, res) => {
  let queryString = `insert into mail_system.file (file_no, file_data, orgname, summary) 
  select imd.id,imf.pdffile,imd.orgname,imd.summary from archieve.importdata imd
  join archieve.importfile imf 
  on imd.id = imf.id
  where imd.id = '${req.params.fileId}';`

  let queryString2 = `insert into mail_system.dep_file (file_id,dep_id,notify) values ("${
    req.params.fileId
  }",${8},${1});`

  const file = await db.query(queryString).catch((err) => {
    throw err
  })

  const file2 = await db.query(queryString2).catch((err) => {
    throw err
  })
  res.status(200).json(file2)
}

const fileToDailyScreenExp = async (req, res) => {
  let queryString = `insert into mail_system.file (file_no, file_data, orgname, summary) 
  select emd.id,emf.pdffile,emd.orgname,emd.summary from archieve.exportdata emd
  join archieve.exportfile emf 
  on emd.id = emf.id
  where emd.id = '${req.params.fileId}';`

  let queryString2 = `insert into mail_system.dep_file (file_id,dep_id,notify) values ("${
    req.params.fileId
  }",${8},${1});`

  const file = await db.query(queryString).catch((err) => {
    throw err
  })

  const file2 = await db.query(queryString2).catch((err) => {
    throw err
  })
  res.status(200).json(file2)
}

const openFile = async (req, res) => {
  let queryString = `select file_data from mail_system.file where file_no='${req.params.fileId}';`
  const file = await db.query(queryString).catch((err) => {
    throw err
  })

  staticID = req.params.fileId
  let buff = file[0].file_data
  fs.writeFileSync('src/pages/sample.pdf', buff, { encoding: 'ascii' })

  return res.status(200).json({ buff })
}

const sendFiles = async (req, res) => {
  let checkedDeps = req.body.checkedState
  let fileId = req.body.selectedFile
  let departments = []

  for (let i = 1; i < checkedDeps.length; i++)
    if (checkedDeps[i] == true) departments.push(i)

  departments.forEach(async (dep) => {
    let queryString = `insert into mail_system.dep_file (file_id,dep_id,notify) values ('${fileId}',${dep},${1})`
    await db.query(queryString).catch((err) => {
      throw err
    })
  })

  res.status(200).json({ message: 'success' })
}

const showDailyDocuments = async (req, res) => {
  let dep_id = req.params.id
  let queryString = ` SELECT f.file_no,f.file_data,f.orgname,f.summary,d.dep_id, d.notify FROM file f join dep_file d on f.file_no = d.file_id  where d.dep_id = ${dep_id};`
  const files = await db.query(queryString).catch((err) => {
    throw err
  })
  res.status(200).json(files)
}

const docTotal = async (req, res) => {
  let queryString = `SELECT count(*) as docTotal FROM mail_system.dep_file where dep_id = ${req.params.depId};`
  const docsNo = await db.query(queryString).catch((err) => {
    throw err
  })
  res.status(200).json(docsNo)
}

const getPdfEditor = (req, res) => {
  fs.readFile('src/pages/DocScreen.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    res.send(data)
  })
}

const getPdf = (req, res) => {
  fs.readFile('src/pages/sample.pdf', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    res.send(data)
  })
}

const messageIsRead = async (req, res) => {
  console.log('hi')
  let queryString = `update mail_system.dep_file set notify = 0 where  file_id = '${req.params.fileId}' and dep_id = ${req.params.depId};`
  const docsNo = await db.query(queryString).catch((err) => {
    throw err
  })
  res.status(201).json({ message: 'success' })
}

const savePdf = async (req, res) => {
  let data = new Buffer.from(req.body.body, 'binary')
  var query = ` update mail_system.file SET ? where file_no='${staticID}'`,
    values = {
      file_data: data,
    }
  db.query(query, values, function (er, da) {
    if (er) throw er
  })
}

module.exports = {
  fileToDailyScreenImp,
  fileToDailyScreenExp,
  fileListImp,
  fileListExp,
  openFile,
  showDailyDocuments,
  getPdf,
  messageIsRead,
  getPdfEditor,
  savePdf,
  sendFiles,
  docTotal,
}

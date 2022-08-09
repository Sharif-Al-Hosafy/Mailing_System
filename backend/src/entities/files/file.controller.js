const jwt = require('jsonwebtoken');
const err = require('../../utils/createError');
const db = require('../../config/db.mail'); // database archieve
const { Buffer } = require('buffer');
const fs = require('fs');
let staticID;

const fileList = async (req, res) => {
  let queryString = `select id,orgname,importid,summary,importdate from archieve.importdata where importid = ${req.params.id} ORDER BY importdate DESC;`;
  const file = await db.query(queryString).catch((err) => {
    throw err;
  });
  res.status(200).json(file);
};

const fileToDailyScreen = async (req, res) => {
  let queryString = `insert into mail_system.file (file_no, file_data, orgname, summary) 
  select imd.id,imf.pdffile,imd.orgname,imd.summary from archieve.importdata imd
  join archieve.importfile imf 
  on imd.id = imf.id
  where imd.id = '${req.params.fileId}';`;
  const file = await db.query(queryString).catch((err) => {
    throw err;
  });
  res.status(200).json(file);
};

const openFile = async (req, res) => {
  let queryString = `select file_data from mail_system.file where file_no='${req.params.fileId}';`;
  const file = await db.query(queryString).catch((err) => {
    throw err;
  });

  staticID = req.params.fileId;
  let buff = file[0].file_data;

  //fs.writeFileSync('src/pages/hi.txt', blob, { encoding: 'ascii' })
  fs.writeFileSync('src/pages/sample.pdf', buff, { encoding: 'ascii' });
  // fs.writeFile(
  //   "src/pages/sample.pdf",
  //   blob,
  //   { encoding: "base64" },

  //   function (err) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("file created");
  //     }
  //   }
  // );
  return res.status(200).json({ buff });
};

const sendFiles = async (req, res) => {
  let checkedDeps = req.body.checkedState;
  let fileId = req.body.selectedFile;
  let departments = [];

  for (let i = 1; i < checkedDeps.length; i++)
    if (checkedDeps[i] == true) departments.push(i);

  departments.forEach(async (dep) => {
    let queryString = `insert into mail_system.dep_file (file_id,dep_id) values ('${fileId}',${dep})`;
    await db.query(queryString).catch((err) => {
      throw err;
    });
  });

  res.status(200).json({ message: 'success' });
};

const showDailyDocuments = async (req, res) => {
  let dep_id = req.params.id;
  console.log(dep_id);
  let queryString = `select * from mail_system.file where (select file_id from dep_file where dep_id = ${dep_id});`;
  const files = await db.query(queryString).catch((err) => {
    throw err;
  });
  res.status(200).json(files);
};

const getPdfEditor = (req, res) => {
  fs.readFile('src/pages/DocScreen.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
};

const getPdf = (req, res) => {
  fs.readFile('src/pages/sample.pdf', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
};

const savePdf = async (req, res) => {
  let data = new Buffer.from(req.body.body, 'binary');
  var query = ` update mail_system.file SET ? where file_no='${staticID}'`,
    values = {
      file_data: data,
    };
  db.query(query, values, function (er, da) {
    if (er) throw er;
  });
};

module.exports = {
  fileToDailyScreen,
  fileList,
  openFile,
  showDailyDocuments,
  getPdf,
  getPdfEditor,
  savePdf,
  sendFiles,
};

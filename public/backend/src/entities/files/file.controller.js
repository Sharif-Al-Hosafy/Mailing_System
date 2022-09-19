const jwt = require("jsonwebtoken");
const err = require("../../utils/createError");
const db = require("../../config/db");
const { Buffer } = require("buffer");
const fs = require("fs");
const path = require("path");
let staticID;
const fileListImp = async (req, res) => {
  let queryString = `select id,orgname,importid,summary,importdate from archieve.importdata where importid = ${req.params.id} ORDER BY importdate DESC;`;
  const file = await db.query(queryString).catch((err) => {
    throw err;
  });

  if (file.length == 0) throw err(404, "لا يوجد مكاتبة بهذا الرقم");
  res.status(200).json(file);
};

const fileListExp = async (req, res) => {
  let queryString = `select id,orgname,exportid,summary,exportdate from archieve.exportdata where exportid = ${req.params.id} ORDER BY exportdate DESC;`;
  const file = await db.query(queryString).catch((err) => {
    throw err;
  });
  if (file.length == 0) throw err(404, "لا يوجد مكاتبة بهذا الرقم");
  res.status(200).json(file);
};

const fileToDailyScreenImp = async (req, res) => {
  let queryString = `insert into mail_system.file (file_no, file_data, orgname, summary,date) 
  select imd.id,imf.pdffile,imd.orgname,imd.summary,current_date() from archieve.importdata imd
  join archieve.importfile imf 
  on imd.id = imf.id
  where imd.id = "${req.params.fileId}";`;
  const file = await db.query(queryString).catch((err) => {
    throw err;
  });

  let qInsertion = `insert into mail_system.filesent (file_id, dep_id) values ("${
    req.params.fileId
  }",${4});`;
  const insertion = await db.query(qInsertion).catch((err) => {
    throw err;
  });

  let queryString2 = `insert into mail_system.dep_file (file_id,dep_id,notify,notify_color) values ("${
    req.params.fileId
  }",${3},${1},${1});`;
  const file2 = await db.query(queryString2).catch((err) => {
    throw err;
  });
  res.status(200).json(file2);
};

const fileToDailyScreenExp = async (req, res) => {
  let queryString = `insert into mail_system.file (file_no, file_data, orgname, summary,date) 
  select emd.id,emf.pdffile,emd.orgname,emd.summary,current_date() from archieve.exportdata emd
  join archieve.exportfile emf 
  on emd.id = emf.id
  where emd.id = '${req.params.fileId}';`;
  const file = await db.query(queryString).catch((err) => {
    throw err;
  });

  let qInsertion = `insert into mail_system.filesent (file_id, dep_id) values ('${req.params.fileId}',4);`;
  const insertion = await db.query(qInsertion).catch((err) => {
    throw err;
  });

  let queryString2 = `insert into mail_system.dep_file (file_id,dep_id,notify,notify_color) values ("${
    req.params.fileId
  }",${3},${1},${1});`;
  const file2 = await db.query(queryString2).catch((err) => {
    throw err;
  });
  res.status(200).json(insertion);
};

const openFile = async (req, res) => {
  let queryString = `select file_data from mail_system.file where file_no='${req.params.fileId}';`;
  const file = await db.query(queryString).catch((err) => {
    throw err;
  });

  staticID = req.params.fileId;
  let buff = file[0].file_data;
  fs.writeFileSync("sample.pdf", buff, {
    encoding: "ascii",
  });

  return res.status(200).json({ buff });
};

const showFileSearch = async (req, res) => {
  let fileType;
  if (req.params.fileId.includes("و")) fileType = "importfile";
  else fileType = "exportfile";

  let queryString = `select pdffile from archieve.${fileType} where id='${req.params.fileId}';`;
  const file = await db.query(queryString).catch((err) => {
    throw err;
  });
  staticID = req.params.fileId;
  let buff = file[0].pdffile;
  fs.writeFileSync("sample.pdf", buff, {
    encoding: "ascii",
  });

  return res.status(200).json({ buff });
};

const sendFiles = async (req, res) => {
  let checkedDeps = req.body.checkedState;
  let fileId = req.body.selectedFile;
  let departments = [];

  for (let i = 1; i < checkedDeps.length; i++)
    if (checkedDeps[i] == true) departments.push(i);

  departments.forEach(async (dep) => {
    let queryString = `insert into mail_system.dep_file (file_id,dep_id,notify,notify_color) values ('${fileId}',${dep},${1},${1})`;
    await db.query(queryString).catch((err) => {
      throw err;
    });
  });

  res.status(200).json({ message: "success" });
};

const showDailyDocuments = async (req, res) => {
  let dep_id = req.params.id;
  let queryString = ` SELECT file_no,file_data,orgname,summary,id,dep_id, notify,notify_color,date FROM mail_system.file f join mail_system.dep_file on file_no = file_id  where dep_id = ${dep_id} order by id desc;`;
  const files = await db.query(queryString).catch((err) => {
    throw err;
  });
  res.status(200).json(files);
};

const showSentDocs = async (req, res) => {
  let dep_id = req.params.depId;
  let queryString = ` SELECT file_no,file_data,orgname,summary,id,dep_id FROM mail_system.file join mail_system.filesent on file_no = file_id  where dep_id = ${dep_id} order by id desc;`;
  const files = await db.query(queryString).catch((err) => {
    throw err;
  });
  res.status(200).json(files);
};

const docTotal = async (req, res) => {
  let queryString = `SELECT count(*) as docTotal FROM mail_system.dep_file where dep_id = ${req.params.depId};`;
  const docsNo = await db.query(queryString).catch((err) => {
    throw err;
  });
  res.status(200).json(docsNo);
};

const getPdfEditor = (req, res) => {
  fs.readFile(__dirname + "/DocScreen.html", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
};

const getPdfViewer = (req, res) => {
  //"../../src/pages/ViewScreen.html" dev
  fs.readFile("../../src/pages/ViewScreen.html", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
};

const getPdf = (req, res) => {
  fs.readFile("sample.pdf", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
};

const messageIsSent = async (req, res) => {
  let queryString = `update mail_system.dep_file set notify = 0 where dep_id = ${req.params.depId};`;
  const docsNo = await db.query(queryString).catch((err) => {
    throw err;
  });
  res.status(200).json({ message: "success" });
};
//file_id = '${req.params.fileId}'
const messageIsRead = async (req, res) => {
  let queryString = `update mail_system.dep_file set notify_color = 0 where  file_id = '${req.params.fileId}' and dep_id = ${req.params.depId};`;
  const docsNo = await db.query(queryString).catch((err) => {
    throw err;
  });
  res.status(200).json({ message: "success" });
};

const savePdf = async (req, res) => {
  let data = new Buffer.from(req.body.body, "binary");
  var query = ` update mail_system.file SET ? where file_no='${staticID}'`,
    values = {
      file_data: data,
    };
  db.query(query, values, function (er, da) {
    if (er) throw er;
  });
};

const removeOnSend = async (req, res) => {
  let queryString = `insert into mail_system.filesent (file_id, dep_id) values ("${req.params.fileId}",${req.params.depId});`;
  const insertion = await db.query(queryString).catch((err) => {
    throw err;
  });

  let query = `delete from mail_system.dep_file where file_id ="${req.params.fileId}" and dep_id = ${req.params.depId}; `;
  const deletion = await db.query(query).catch((err) => {
    throw err;
  });
  res.status(201).json({ message: "success" });
};

const weeklyTruncate = async (req, res) => {
  let queryString = `delete from mail_system.file where date < now() - interval 7 DAY;`;
  const Trunc = await db.query(queryString).catch((err) => {
    throw err;
  });
  res.status(200).json({ message: "success" });
};
module.exports = {
  fileToDailyScreenImp,
  fileToDailyScreenExp,
  fileListImp,
  fileListExp,
  openFile,
  showDailyDocuments,
  getPdf,
  messageIsRead,
  messageIsSent,
  getPdfEditor,
  savePdf,
  sendFiles,
  docTotal,
  removeOnSend,
  showFileSearch,
  showSentDocs,
  getPdfViewer,
  weeklyTruncate,
};

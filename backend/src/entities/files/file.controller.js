const jwt = require("jsonwebtoken");
const err = require("../../utils/createError");
const db = require("../../config/db.mail"); // database archieve
const { Buffer } = require("buffer");
const fs = require("fs");

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

  let blob = file[0].file_data;
  let buff = Buffer(blob, "binary").toString("base64");
  fs.writeFile(
    "./src/sample.pdf",
    buff,
    { encoding: "base64" },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("file created");
      }
    }
  );
  return res.status(200).send({ message: "sucess" });
};

const showDailyDocuments = async (req, res) => {
  let queryString = `select * from mail_system.file`;
  const files = await db.query(queryString).catch((err) => {
    throw err;
  });
  res.status(200).json(files);
};

module.exports = {
  fileToDailyScreen,
  fileList,
  openFile,
  showDailyDocuments,
};

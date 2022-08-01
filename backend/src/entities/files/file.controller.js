const jwt = require("jsonwebtoken");
const err = require("../../utils/createError");
const db = require("../../config/db.mail"); // database archieve
const { Buffer } = require("buffer");
const fs = require("fs");
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
  let blob = Buffer.from(buff, "binary").toString("base64");
  fs.writeFileSync("src/pages/sample.pdf", blob, { encoding: "base64" });
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

const showDailyDocuments = async (req, res) => {
  let queryString = `select * from mail_system.file`;
  const files = await db.query(queryString).catch((err) => {
    throw err;
  });
  res.status(200).json(files);
};

const getPdfEditor = (req, res) => {
  fs.readFile("src/pages/DocScreen.html", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
};

const getPdf = (req, res) => {
  fs.readFile("src/pages/sample.pdf", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
};

const savePdf = async (req, res) => {
  // req.on("data", async (data) => {
  //let bs64 = Buffer.from(data).toString("base64");
  // console.log(bs64);
  //fs.writeFileSync("./public/txt.pdf", bs64);
  // var query = ` update mail_system.file SET ? where file_no='${staticID}'`,
  //   values = {
  //     file_data: data,
  //   };
  // db.query(query, values, function (er, da) {
  //   if (er) throw er;
  // });
  //});
  // req.on("end", () => {
  //   res.send("ok");
  // });
  req.on("data", (data) => {
    console.log(data);
    // let bs64 = Buffer.from(data).toString("base64");

    fs.writeFileSync("src/pages/sample13123.pdf", data);
  });
  req.on("end", () => {
    res.send("ok");
  });
};

// const savePdf = async (req, res) => {
//   var bs64;
//   req.on("data", (data) => {
//     // read binary data

//     //let blob = new Buffer(data).toString("base64");
//     bs64 = Buffer.from(data, "binary").toString("base64");
//     fs.writeFile(
//       "./src/pages/sample.pdf",
//       bs64,
//       { encoding: "base64" },
//       function (err) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log("file created");
//         }
//       }
//     );
//   });

//   req.on("end", () => {
//     res.send("ok");
//   });
// };

module.exports = {
  fileToDailyScreen,
  fileList,
  openFile,
  showDailyDocuments,
  getPdf,
  getPdfEditor,
  savePdf,
};

const jwt = require("jsonwebtoken");
const err = require("../../utils/createError");
const db = require("../../config/db.mail"); // database archieve
const { Buffer, Blob } = require("buffer");
const fs = require("fs");
const http = require("http").createServer();
const io = require("socket.io")(http);
let staticID;

io.on("connection", (socket) => {
  //Socket is a Link to the Client
  console.log("New Client is Connected!");
  //Here the client is connected and we can exchanged
});

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
  let blob = Buffer(buff, "binary").toString("base64");
  fs.writeFile(
    "./public/sample.pdf",
    blob,
    { encoding: "base64" },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("file created");
      }
    }
  );
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
  fs.readFile("public/sample.pdf", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
};

const getStaticID = (req, res) => {
  res.json({ id: staticID });
};

const savePdf = async (req, res) => {
  req.on("data", (data) => {
    let blob = Buffer(data);
    fs.writeFile(
      "./src/pages/sample.pdf",
      blob,
      { encoding: "base64" },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("file created");
        }
      }
    );
  });

  req.on("end", () => {
    res.send("ok");
  });

  //   io.on('connection', function(socket) {
  //     socket.on('message', function(data){
  //         console.log("recieved data:");
  //         console.log(data);

  //         var bufArr = new ArrayBuffer(4);
  //         var bufView = new Uint8Array(bufArr);
  //         bufView[0]=6;
  //         bufView[1]=7;
  //         bufView[2]=8;
  //         bufView[3]=9;
  //         socket.emit('message',bufArr);
  //     });
  // });
  // const buffer = Buffer.from(req.body.blob, "binary");
  // let queryString = `insert into archieve.importfile (pdffile) values(${buffer}) where id=${staticID}`;
  // const files = await db.query(queryString).catch((err) => {
  //   throw err;
  // });
};

module.exports = {
  fileToDailyScreen,
  fileList,
  openFile,
  showDailyDocuments,
  getPdf,
  getStaticID,
  getPdfEditor,
  savePdf,
};

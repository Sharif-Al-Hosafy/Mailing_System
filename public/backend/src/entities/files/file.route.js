const router = require("express").Router();
const {
  fileToDailyScreenImp,
  fileToDailyScreenExp,
  fileListImp,
  fileListExp,
  openFile,
  showDailyDocuments,
  messageIsRead,
  messageIsSent,
  getPdf,
  getPdfEditor,
  showFileSearch,
  savePdf,
  sendFiles,
  docTotal,
  removeOnSend,
  showSentDocs,
  weeklyTruncate,
  getPdfViewer,
} = require("./file.controller");
const authMiddleware = require("../../utils/authMiddleware");

router.route("/send").post(sendFiles);
router.route("/notify/:depId").post(messageIsSent); // notification sound
router.route("/read/:fileId/:depId").post(messageIsRead); // message is read " color change "
router.route("/docNo/:depId").get(docTotal);
router.route("/savepdf").post(savePdf);
router.route("/editor").get(getPdfEditor);
router.route("/viewer").get(getPdfViewer);
router.route("/sample.pdf").get(getPdf);
router.route("/imp/:id").get(fileListImp); // list of document imp
router.route("/exp/:id").get(fileListExp); // list of document exp
router.route("/daily/save/imp/:fileId").post(fileToDailyScreenImp); // add document to daily screen imp
router.route("/daily/save/exp/:fileId").post(fileToDailyScreenExp); // add document to daily screen exp
router.route("/daily/show/:id").get(showDailyDocuments); // show documents from daily screen
router.route("/open/:fileId").get(openFile); // open a document
router.route("/openFileSearch/:fileId").get(showFileSearch); // open file search a document
router.route("/remove/:fileId/:depId").delete(removeOnSend); //delete row after sending file
router.route("/daily/sent/:depId").get(showSentDocs); // show documents from daily screen
router.route("/truncate").get(weeklyTruncate);

module.exports = router;

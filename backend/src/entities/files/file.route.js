const router = require('express').Router();
const {
  fileToDailyScreenImp,
  fileToDailyScreenExp,
  fileListImp,
  fileListExp,
  openFile,
  showDailyDocuments,
  getPdf,
  getPdfEditor,
  savePdf,
  sendFiles,
} = require('./file.controller');
const authMiddleware = require('../../utils/authMiddleware');

router.route('/send').post(sendFiles);
router.route('/savepdf').post(savePdf);
router.route('/editor').get(getPdfEditor);
router.route('/sample.pdf').get(getPdf);
router.route('/imp/:id').get(fileListImp); // list of document imp
router.route('/exp/:id').get(fileListExp); // list of document exp
router.route('/daily/save/imp/:fileId').post(fileToDailyScreenImp); // add document to daily screen imp
router.route('/daily/save/exp/:fileId').post(fileToDailyScreenExp); // add document to daily screen exp
router.route('/daily/show/:id').get(showDailyDocuments); // show documents from daily screen
router.route('/open/:fileId').get(openFile); // open a document

module.exports = router;

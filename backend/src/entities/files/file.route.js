const router = require('express').Router()
const {
  fileToDailyScreen,
  fileList,
  openFile,
  showDailyDocuments,
} = require('./file.controller')
const authMiddleware = require('../../utils/authMiddleware')

router.route('/:id').get(fileList) // list of document

router.route('/daily/save/:fileId').post(fileToDailyScreen) // add document to daily screen
router.route('/daily/show').get(showDailyDocuments) // show documents from daily screen

router.route('/open/:fileId').get(openFile) // open a document

module.exports = router

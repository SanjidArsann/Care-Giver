const express = require('express');
const UploadHandlers = require('../Middleware/UploadHandler');
const UploadFiles = require('../Controller/UploadController');

const router=express.Router();
router.post(
  '/files',
  UploadHandlers.fileUploadHandler.single('file'),
  UploadFiles.uploadPdfFile
)


module.exports = router
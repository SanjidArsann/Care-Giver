/* eslint-disable no-unused-vars */
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs/promises');

/* --- start resize and save image --- */
const resizeAndSaveImage = async (file, width, height, pathName) => {
  const resizedImagePath = path.join(pathName, 'resized_' + file.filename);
  try {
    await sharp(file.path).resize(width, height).toFile(resizedImagePath);
    await fs.unlink(file.path);
    file.path = resizedImagePath;
    return file;
  } catch (error) {
    throw new Error('Image resize failed');
  }
};


/* Start File Uploader */
const storageFile = multer.diskStorage({
  destination: 'uploads/files',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + 'files' + file.originalname.split(' ').join('');
    cb(null, uniqueSuffix);
  },
});

const fileUploadHandler = multer({
  storage: storageFile,
  fileFilter: (req, file, cb) => {
    const supportedFile = /pdf|doc|docx|xls|xlsx|ppt|pptx|txt|csv|jpg|jpeg|png|gif/;
    const extension = path.extname(file.originalname);
    console.log(extension);

    if (supportedFile.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file format'));
    }
  },
});




/* End File Uploader */

module.exports = {
    resizeAndSaveImage,
    fileUploadHandler,
};

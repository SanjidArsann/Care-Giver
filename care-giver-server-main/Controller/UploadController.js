const fs = require('fs/promises');
const createError=require('http-errors');
// const config = require('../../../config');


// upload pdf file
const uploadPdfFile = async (req, res,next) => {
    try{
        if (!req.file) {
            throw new Error('Please upload a file');
        }
        const filename = req?.file?.filename;
  const fileUrl = `http://localhost:9000/uploads` + '/files/' + filename;
res.status(200).json({
    status: true,
    message: 'File uploaded successfully',
    data: {
      fileUrl,
    },
})

    }catch (error) {
        next(createError(500, error.message));
    }
  
 
}

module.exports = {
    uploadPdfFile,
};

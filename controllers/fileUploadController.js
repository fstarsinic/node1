// fileUploadController.js

const fs = require('fs');
const path = require('path');
const multer = require('multer');
const csvParser = require('csv-parser');
const upload = multer({ storage: multer.memoryStorage() });


function handleFileUpload(req, res) {
  console.log('handleFileUpload called')
  console.log(req.csvFile)
  if (!req.files || !req.files.csvFile) {
    return res.status(400).send({message: 'No CSV file uploaded. Form field name must be "csvFile"'});
  }

  const maxSize = 1024 * 1024; // 1 MB
  const uploadedFile = req.files.csvFile;
  console.log(`Uploaded file: ${uploadedFile}`)

  if (uploadedFile.size > maxSize) {
    return res.status(400).send({message: 'File size exceeds 1 MB'});
  }

  const allowedFilenameRegex = /^[a-zA-Z0-9_\.]+$/;
  if (!allowedFilenameRegex.test(uploadedFile.name)) {
    return res.status(400).send({message: 'Invalid filename. Use only alphanumeric characters.'});
  }


  // Generate a unique filename for the uploaded CSV file
  const uniqueFilename = `${Date.now()}-${uploadedFile.name}`;
  const filePath = path.join(__dirname, '../uploads', uniqueFilename);

  // Assuming 'uploadedFile' is your file data
  const fileBuffer = Buffer.from(uploadedFile.data);

  fs.writeFile(filePath, fileBuffer, (err) => {
    return res.status(200).send({message: 'Successful upload.'});
  });

/*  // Save the file to disk
  fs.writeFile(filePath, fileBuffer, (err) => {
    if (err) {
        console.error(err);
        res.redirect('/pages/fileUploadResult?msg=fail');
    } else {
        res.redirect('/pages/fileUploadResult?msg=success');
    }
    return res.status(200).send('File uploaded successfully');

  });
*/

}

module.exports = {
  handleFileUpload,
};

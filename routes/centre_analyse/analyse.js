const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { AddAnalyse } = require('../../controllers/centre_analyse/analyse');
const { servePdfFile } = require('../../controllers/filepdf'); 
// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Ensure unique file name
  }
});

const upload = multer({ storage });


router.post('/addAnalyse/:id_user', upload.single('result'), AddAnalyse);
router.get('/uploads/:fileName', servePdfFile);
module.exports = router;

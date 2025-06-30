const express = require('express');
const router = express.Router();
const { getAnalyseByEtat } = require('../../controllers/patient/analyse');
const { servePdfFile } = require('../../controllers/filepdf'); 
router.get('/analyse/:id_user/:etat', getAnalyseByEtat);

router.get('/uploads/:fileName', servePdfFile);

module.exports = router;

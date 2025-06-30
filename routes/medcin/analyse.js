const express = require('express');
const router = express.Router();
const { addAnalyse } = require('../../controllers/medcin/analyse');
const { getAnalyseByEtat } = require('../../controllers/patient/analyse');
const { servePdfFile} = require('../../controllers/filepdf');
router.get('/analysep/:id_user/:etat',getAnalyseByEtat)
router.post('/add/analyse/:id_user', addAnalyse);
router.get('/analyser/:id_user/:etat',getAnalyseByEtat)
router.get('/uploads/:fileName', servePdfFile);
module.exports = router;

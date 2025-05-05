const express = require('express');
const router = express.Router();
const { addAnalyse } = require('../../controllers/medcin/analyse');
const { getAnalyseByEtat } = require('../../controllers/patient/analyse');

router.get('/analysep/:id_user/:etat',getAnalyseByEtat)
router.post('/add/analyse/:id_user', addAnalyse);
router.get('/analyser/:id_user/:etat',getAnalyseByEtat)
module.exports = router;

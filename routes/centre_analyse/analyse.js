const express = require('express');
const { getAnalyse, getAnalyseById, createAnalyse, updateAnalyse, getAnalyseByEtat } = require('../../controllers/centre_analyse/analyse');

const router = express.Router();

router.get('/analyses', getAnalyse);

router.get('/analyses/:id', getAnalyseById);

router.post('/analyses', createAnalyse);

router.put('/analyses/:id', updateAnalyse);

router.get('/analyses/etat/:etat', getAnalyseByEtat);

module.exports = router;

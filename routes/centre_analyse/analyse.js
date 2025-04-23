const express = require('express');
const router = express.Router();

const {getAnalyse, getAnalyseById, createAnalyse, updateAnalyse,getAnalyseByEtat} = require('../../controllers/centre_analyse/analyse');
router.get('/', getAnalyse);
router.get('/:id', getAnalyseById);
router.post('/', createAnalyse);
router.put('/:id', updateAnalyse);
router.get('/etat/:id/:etat', getAnalyseByEtat);
module.exports = router;
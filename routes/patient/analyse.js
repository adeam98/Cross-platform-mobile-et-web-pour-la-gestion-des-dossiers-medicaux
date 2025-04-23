const express = require('express');
const router = express.Router();
const { getAnalyse ,getALLAnalyse } = require('../../controllers/patient/analyse');
router.get('/:id', getAnalyse); 
router.get('/all/:id', getALLAnalyse);
module.exports = router;

const express = require('express');
const router = express.Router();
const { getAnalyse } = require('../../controllers/patient/analyse');
router.get('/:id', getAnalyse); 

module.exports = router;

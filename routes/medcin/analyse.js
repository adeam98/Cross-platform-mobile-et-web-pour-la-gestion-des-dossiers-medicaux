const express = require('express');
const router = express.Router();
const { addAnalyse } = require('../../controllers/medcin/analyse');

router.post('/analyses', addAnalyse);

module.exports = router;

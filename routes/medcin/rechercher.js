const express = require('express');
const router = express.Router();
const { getpatient } = require('../../controllers/medcin/rechercher');
router.post('/rechercher', getpatient);
module.exports = router;
const express = require('express');
const router = express.Router();
const { getConsultation} = require('../controllers/consultation');

router.get('/:id', getConsultation);

module.exports = router;
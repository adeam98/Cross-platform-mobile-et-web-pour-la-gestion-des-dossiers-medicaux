const express = require('express');
const router = express.Router();
const { getConsultation, getALLconsultation} = require('../../controllers/patient/consultation');
router.get('/:id', getConsultation);
router.get('/all/:id', getALLconsultation);

module.exports = router;
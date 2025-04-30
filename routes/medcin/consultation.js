const express = require('express');
const router = express.Router();
const { AddConsultation, getConsultationById, getAllConsultations, updateConsultation } = require('../../controllers/medcin/consultation');

router.post('/consultations', AddConsultation);

router.get('/consultations', getAllConsultations);

router.get('/consultations/:id', getConsultationById);

router.put('/consultations/:id', updateConsultation);

module.exports = router;

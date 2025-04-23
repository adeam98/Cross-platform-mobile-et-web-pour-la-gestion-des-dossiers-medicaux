const express = require('express');
const router = express.Router();
const {AddConsultation, getConsultationById, getAllConsultations, updateConsultation} = require('../../controllers/medcin/consultation');

router.post('/', AddConsultation);
router.get('/:id', getConsultationById);
router.get('/', getAllConsultations);
router.put('/:id', updateConsultation);
module.exports = router;
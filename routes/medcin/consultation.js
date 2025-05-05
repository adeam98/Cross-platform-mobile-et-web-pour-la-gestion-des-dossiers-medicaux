const express = require('express');
const router = express.Router();
const { AddConsultation, getAllConsultations, updateConsultation } = require('../../controllers/medcin/consultation');

router.post('/add/consultation/:id_user', AddConsultation);

router.get('/consultation/:id_user', getAllConsultations);

router.put('/update/consultation/:id_user', updateConsultation);

module.exports = router;

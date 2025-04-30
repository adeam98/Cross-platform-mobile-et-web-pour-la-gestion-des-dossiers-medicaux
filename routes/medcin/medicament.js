const express = require('express');
const router = express.Router();
const { getmedicament, getMedicamentById, createMedicament, updateMedicament, deleteMedicament } = require('../controllers/medcin/medicament');
router.get('/medicament', getmedicament);
router.get('/medicament/:id', getMedicamentById);
router.post('/medicament', createMedicament);
router.put('/medicament/:id', updateMedicament);
router.delete('/medicament/:id', deleteMedicament);
module.exports = router;
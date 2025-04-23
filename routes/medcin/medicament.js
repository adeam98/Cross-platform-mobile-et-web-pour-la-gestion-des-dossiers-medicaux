const express = require('express');
const router = express.Router();
const { getmedicament, getMedicamentById, createMedicament, updateMedicament, deleteMedicament } = require('../controllers/medcin/medicament');
router.get('/', getmedicament);
router.get('/:id', getMedicamentById);
router.post('/', createMedicament);
router.put('/:id', updateMedicament);
router.delete('/:id', deleteMedicament);
module.exports = router;
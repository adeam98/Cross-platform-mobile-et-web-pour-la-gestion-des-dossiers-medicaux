const express = require('express');
const router = express.Router();
const { getAllmedicament, addmedicament, updatemedicament, deletemedicament } = require('../../controllers/medcin/medicament');
router.get('/medicament/:id_user', getAllmedicament);
router.post('/add/medicament/:id_user', addmedicament);
router.put('/medicament/update/:id_user/:id_medicament', updatemedicament);
router.delete('/medicament/delete/:id_user/:id_medicament', deletemedicament);
module.exports = router;
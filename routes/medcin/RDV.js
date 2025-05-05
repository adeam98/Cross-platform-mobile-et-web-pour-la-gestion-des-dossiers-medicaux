const express = require('express');
const router = express.Router();
const { addRDV, updateRDV, deleteRDV,getAllRDVs } = require('../../controllers/medcin/RDV');

router.get('/RDV/:id_user/all', getAllRDVs);
router.post('/RDV/add/:id_user', addRDV);
router.put('/RDV//update/:id_user', updateRDV);
router.delete('/RDV/delete/:id_user', deleteRDV);
module.exports = router;

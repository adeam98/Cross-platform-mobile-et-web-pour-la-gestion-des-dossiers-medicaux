const express = require('express');
const router = express.Router();
const { createRDV, getRDVById, updateRDV, deleteRDV } = require('../../controllers/medcin/RDV');

router.post('/RDV', createRDV);
router.get('/RDV/:id', getRDVById);
router.put('/RDV/:id', updateRDV);
router.delete('/RDV/:id', deleteRDV);
module.exports = router;

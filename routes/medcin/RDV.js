const express = require('express');
const router = express.Router();
const { createRDV, getRDVById, updateRDV, deleteRDV } = require('../../controllers/medcin/RDV');

router.post('/', createRDV);
router.get('/:id', getRDVById);
router.put('/:id', updateRDV);
router.delete('/:id', deleteRDV);
module.exports = router;

const express = require('express');
const router = express.Router();
const { getAllRDV,getRDVById } = require('../../controllers/patient/RDV');

router.get('/rdv/:id_user', getAllRDV);

router.get('/:id', getRDVById);

module.exports = router;
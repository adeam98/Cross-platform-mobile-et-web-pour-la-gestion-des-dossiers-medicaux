const express = require('express');
const router = express.Router();
const { getAllRDV,getRDVById } = require('../../controllers/patient/RDV');
route.get('/:id_user', getAllRDV);
router.get('/:id_user/:id_rdv', getRDVById);
module.exports = router;

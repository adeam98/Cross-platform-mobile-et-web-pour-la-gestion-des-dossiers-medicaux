const express = require('express');
const router = express.Router();
const { getAllRDV } = require('../../controllers/patient/RDV');

router.get('/rdv/:id_user', getAllRDV);



module.exports = router;
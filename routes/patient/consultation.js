const express = require('express');
const router = express.Router();
const { getALLconsultation} = require('../../controllers/patient/consultation');
router.get('/consultation/:id_user', getALLconsultation);

module.exports = router;
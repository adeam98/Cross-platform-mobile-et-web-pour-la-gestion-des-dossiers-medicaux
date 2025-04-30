const express = require('express');
const router = express.Router();
const { getMedicament} = require('../../controllers/patient/medicament');

router.get('/medicament/:id_user', getMedicament);

module.exports = router;

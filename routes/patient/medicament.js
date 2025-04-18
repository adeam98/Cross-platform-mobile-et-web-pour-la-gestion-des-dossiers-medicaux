const express = require('express');
const router = express.Router();
const { getMedicament} = require('../../controllers/patient/medicament');

router.get('/:id', getMedicament);

module.exports = router;

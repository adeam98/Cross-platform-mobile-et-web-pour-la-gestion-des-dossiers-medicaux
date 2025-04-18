const express = require('express');
const router = express.Router();
const { getMaladie} = require('../../controllers/patient/maladie');

router.get('/:id', getMaladie);

module.exports = router;